const express = require('express');
const router = express.Router();
const User = require('../Models/User'); 
const protect = require('../middleware/verifyToken');

router.get('/profile', protect, async (req, res) => {
    try {
        // بنجيب بيانات اليوزر من الداتابيز باستخدام الـ ID اللي في التوكن
        const user = await User.findById(req.user.id).select('-password'); // بنشيل الباسورد من النتيجة
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
});

router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role || 'user',
                profilePicture: updatedUser.profilePicture
            });
        } else {
            res.status(404).json({ message: "المستخدم غير موجود" });
        }
    } catch (error) {
        res.status(500).json({ message: "خطأ في السيرفر أثناء التحديث" });
    }
});

module.exports = router;