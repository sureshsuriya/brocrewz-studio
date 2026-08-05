-- Initialize default data for BroCrewz Studio

-- Admin User (admin@brocrewz.com / admin123)
INSERT IGNORE INTO users (id, email, password, role) VALUES 
(1, 'admin@brocrewz.com', '$2a$10$B.lI0mQWn9Wl6B8S5.wTTe.cK0YqE/2n/0r.8H4t0s0t4t0t4t0t4', 'ADMIN');

-- Service Plans
INSERT IGNORE INTO service_plans (id, name, description, price, plan_type, features) VALUES
(1, 'Single Video Editing', 'High quality video editing for a single video.', 500.00, 'SINGLE', 'Professional Video Editing, Color Grading, Audio Enhancement'),
(2, 'Single Shorts Editing', 'Engaging short-form content editing.', 200.00, 'SINGLE', 'Shorts Editing, Captions, Motion Graphics'),
(3, 'Thumbnail Design', 'Clickable, high-CTR thumbnail designs.', 100.00, 'SINGLE', 'Custom Design, Source File'),
(4, 'Upload & Channel Management', 'Complete channel management.', 200.00, 'SINGLE', 'SEO Optimization, Tags, Publishing'),
(5, 'Poster Design', 'High quality poster design.', 300.00, 'SINGLE', 'Custom Design, High Resolution'),
(6, 'Flex Banner Design', 'Print-ready flex banner designs.', 300.00, 'SINGLE', 'CMYK format, Print Ready'),
(7, 'Custom Frame Design', 'Custom frame designs for videos.', 300.00, 'SINGLE', 'Custom UI, Brand Colors'),
(8, 'Logo Design', 'Professional brand identity.', 500.00, 'SINGLE', 'Vector Files, Multiple Concepts'),
(9, '20 Videos Plan', 'Monthly plan for 20 long-form videos.', 7000.00, 'MONTHLY', '20 Long Videos, Priority Support, Dedicated Editor'),
(10, '20 Shorts Plan', 'Monthly plan for 20 shorts/reels.', 3000.00, 'MONTHLY', '20 Shorts, Viral Hooks, Quick Turnaround'),
(11, '20 Videos + 20 Shorts', 'Combined monthly plan.', 10000.00, 'MONTHLY', '20 Videos, 20 Shorts, Premium Support'),
(12, 'Full Monthly Management', 'Complete channel takeover.', 12000.00, 'MONTHLY', 'Editing, Thumbnails, Upload, Channel Management');

-- Team Members
INSERT IGNORE INTO team_members (id, name, role, phone, skills, image_url) VALUES
(1, 'Lenin', 'Professional Video Editor', '+91 81243 76230', 'Professional Video Editing, YouTube Editing, Shorts Editing, Motion Graphics, Color Grading, Audio Enhancement', '/assets/team/lenin.jpg'),
(2, 'Vethams', 'Video Editor', '+91 63803 64289', 'Video Editing, YouTube Editing, Reels Editing, Shorts Editing, Motion Graphics', '/assets/team/vethams.jpg'),
(3, 'Jerry', 'Video Editor', NULL, 'Video Editing, YouTube Editing, Shorts Editing, Instagram Reels, Color Grading', '/assets/team/jerry.jpg'),
(4, 'Sam', 'Video Editor', NULL, 'Professional Editing, YouTube Editing, Reels Editing, Motion Graphics', '/assets/team/sam.jpg'),
(5, 'Sujith', 'Video Editor', NULL, 'Professional Editing, YouTube Editing, Shorts Editing, Color Correction', '/assets/team/sujith.jpg');
