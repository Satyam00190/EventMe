import mongoose from 'mongoose';
import User from './models/User.js';
import Event from './models/Event.js';
import Booking from './models/Booking.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventme');
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create Users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@eventme.com',
        password: 'password123',
        role: 'admin',
        phone: '+1234567890'
      },
      {
        name: 'John Organizer',
        email: 'organizer@eventme.com',
        password: 'password123',
        role: 'organizer',
        phone: '+1234567891'
      },
      {
        name: 'Sarah Smith',
        email: 'user@eventme.com',
        password: 'password123',
        role: 'user',
        phone: '+1234567892'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1234567893'
      }
    ]);

    console.log('✅ Created users');

    // Create Events
    const events = await Event.create([
      {
        title: 'Summer Music Festival 2024',
        description: 'Join us for the biggest music festival of the summer! Featuring top artists from around the world, food trucks, and amazing vibes.',
        category: 'Music',
        date: new Date('2024-07-15'),
        time: '18:00',
        location: {
          venue: 'Central Park Amphitheater',
          address: '123 Park Avenue',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        organizer: users[1]._id,
        ticketTypes: [
          {
            name: 'General Admission',
            price: 75,
            quantity: 500,
            sold: 0
          },
          {
            name: 'VIP Pass',
            price: 150,
            quantity: 100,
            sold: 0
          }
        ],
        totalSeats: 600,
        availableSeats: 600,
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
        status: 'published'
      },
      {
        title: 'Tech Innovation Conference 2024',
        description: 'Explore the latest in technology and innovation. Network with industry leaders, attend workshops, and discover cutting-edge solutions.',
        category: 'Conference',
        date: new Date('2024-08-20'),
        time: '09:00',
        location: {
          venue: 'Convention Center',
          address: '456 Tech Boulevard',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA'
        },
        organizer: users[1]._id,
        ticketTypes: [
          {
            name: 'Early Bird',
            price: 299,
            quantity: 200,
            sold: 0
          },
          {
            name: 'Standard Pass',
            price: 399,
            quantity: 300,
            sold: 0
          },
          {
            name: 'Premium Pass',
            price: 599,
            quantity: 50,
            sold: 0
          }
        ],
        totalSeats: 550,
        availableSeats: 550,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        status: 'published'
      },
      {
        title: 'Food & Wine Festival',
        description: 'Indulge in culinary delights from renowned chefs and sample premium wines from around the world.',
        category: 'Festival',
        date: new Date('2024-09-10'),
        time: '12:00',
        location: {
          venue: 'Waterfront Plaza',
          address: '789 Harbor Drive',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        organizer: users[1]._id,
        ticketTypes: [
          {
            name: 'Tasting Pass',
            price: 85,
            quantity: 400,
            sold: 0
          },
          {
            name: 'Chef\'s Table',
            price: 250,
            quantity: 50,
            sold: 0
          }
        ],
        totalSeats: 450,
        availableSeats: 450,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        status: 'published'
      },
      {
        title: 'Marathon for Charity',
        description: 'Run for a cause! Join thousands of runners in this annual charity marathon supporting local communities.',
        category: 'Sports',
        date: new Date('2024-10-05'),
        time: '07:00',
        location: {
          venue: 'City Marathon Route',
          address: 'Starting at City Hall',
          city: 'Boston',
          state: 'MA',
          zipCode: '02101',
          country: 'USA'
        },
        organizer: users[1]._id,
        ticketTypes: [
          {
            name: 'Full Marathon',
            price: 50,
            quantity: 1000,
            sold: 0
          },
          {
            name: 'Half Marathon',
            price: 35,
            quantity: 1500,
            sold: 0
          },
          {
            name: '5K Fun Run',
            price: 20,
            quantity: 2000,
            sold: 0
          }
        ],
        totalSeats: 4500,
        availableSeats: 4500,
        image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
        status: 'published'
      },
      {
        title: 'Art Gallery Opening Night',
        description: 'Experience contemporary art from emerging artists. Wine reception and artist meet-and-greet included.',
        category: 'Other',
        date: new Date('2024-07-25'),
        time: '19:00',
        location: {
          venue: 'Modern Art Gallery',
          address: '321 Gallery Street',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        organizer: users[1]._id,
        ticketTypes: [
          {
            name: 'General Entry',
            price: 25,
            quantity: 200,
            sold: 0
          },
          {
            name: 'Collector\'s Pass',
            price: 100,
            quantity: 30,
            sold: 0
          }
        ],
        totalSeats: 230,
        availableSeats: 230,
        image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800',
        status: 'published'
      },
      {
        title: 'Comedy Night Live',
        description: 'Laugh out loud with top comedians! An evening of stand-up comedy featuring national touring acts.',
        category: 'Theater',
        date: new Date('2024-08-05'),
        time: '20:00',
        location: {
          venue: 'Comedy Club Downtown',
          address: '555 Laugh Lane',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA'
        },
        organizer: users[1]._id,
        ticketTypes: [
          {
            name: 'Standard Seating',
            price: 35,
            quantity: 150,
            sold: 0
          },
          {
            name: 'Premium Seating',
            price: 55,
            quantity: 50,
            sold: 0
          }
        ],
        totalSeats: 200,
        availableSeats: 200,
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
        status: 'published'
      }
    ]);

    console.log('✅ Created events');

    // Create Sample Bookings
    const bookings = await Booking.create([
      {
        user: users[2]._id,
        event: events[0]._id,
        tickets: [
          {
            ticketType: 'General Admission',
            quantity: 2,
            price: 75
          }
        ],
        totalAmount: 150,
        status: 'confirmed',
        bookingReference: 'BK' + Date.now() + '001'
      },
      {
        user: users[3]._id,
        event: events[1]._id,
        tickets: [
          {
            ticketType: 'Early Bird',
            quantity: 1,
            price: 299
          }
        ],
        totalAmount: 299,
        status: 'confirmed',
        bookingReference: 'BK' + Date.now() + '002'
      }
    ]);

    console.log('✅ Created bookings');

    console.log('\n🎉 Seed data created successfully!\n');
    console.log('📧 Test Accounts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Admin:');
    console.log('   Email: admin@eventme.com');
    console.log('   Password: password123');
    console.log('\n👤 Organizer:');
    console.log('   Email: organizer@eventme.com');
    console.log('   Password: password123');
    console.log('\n👤 User:');
    console.log('   Email: user@eventme.com');
    console.log('   Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`📊 Created ${users.length} users`);
    console.log(`🎫 Created ${events.length} events`);
    console.log(`📝 Created ${bookings.length} bookings\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
