import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { createNotification } from '../utils/notificationHelper.js';

const generateBookingReference = () => {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const createBooking = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    let totalAmount = 0;
    let totalTickets = 0;

    for (const ticket of tickets) {
      const ticketType = event.ticketTypes.find(t => t.name === ticket.ticketType);
      if (!ticketType) {
        return res.status(400).json({ message: `Ticket type ${ticket.ticketType} not found` });
      }
      if (ticketType.quantity - ticketType.sold < ticket.quantity) {
        return res.status(400).json({ message: `Not enough ${ticket.ticketType} tickets available` });
      }
      totalAmount += ticketType.price * ticket.quantity;
      totalTickets += ticket.quantity;
    }

    if (event.availableSeats < totalTickets) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = await Booking.create({
      event: eventId,
      user: req.user._id,
      tickets,
      totalAmount,
      bookingReference: generateBookingReference()
    });

    for (const ticket of tickets) {
      const ticketTypeIndex = event.ticketTypes.findIndex(t => t.name === ticket.ticketType);
      event.ticketTypes[ticketTypeIndex].sold += ticket.quantity;
    }
    event.availableSeats -= totalTickets;
    await event.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { bookedEvents: booking._id }
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('event')
      .populate('user', 'name email');

    await createNotification(
      req.user._id,
      'booking',
      'Booking Confirmed',
      `Your booking for ${event.title} has been confirmed. Reference: ${booking.bookingReference}`,
      eventId,
      booking._id
    );

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const event = await Event.findById(booking.event);
    let totalTickets = 0;
    for (const ticket of booking.tickets) {
      const ticketTypeIndex = event.ticketTypes.findIndex(t => t.name === ticket.ticketType);
      event.ticketTypes[ticketTypeIndex].sold -= ticket.quantity;
      totalTickets += ticket.quantity;
    }
    event.availableSeats += totalTickets;
    await event.save();

    await createNotification(
      req.user._id,
      'cancellation',
      'Booking Cancelled',
      `Your booking for ${event.title} has been cancelled. Reference: ${booking.bookingReference}`,
      booking.event,
      booking._id
    );

    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('event', 'title date')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
