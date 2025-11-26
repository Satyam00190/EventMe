import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const file = req.files.image;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size too large. Maximum 5MB allowed' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'eventme',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    await cloudinary.uploader.destroy(publicId);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Image deletion failed', error: error.message });
  }
};
