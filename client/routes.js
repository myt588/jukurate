Router.configure({
  layoutTemplate: 'app_layout'
});

Router.route('/', {
  template: 'home'
});

Router.route('/admin/schools', { template: 'schoolList', name: 'school_list' });
Router.route('/admin/schools/create', { template: 'schoolCreate', name: 'school_create' });
Router.route('/admin/schools/:id', { template: 'schoolShow', name: 'school_show' });
Router.route('/admin/schools/:id/edit', { template: 'schoolEdit', name: 'school_edit' });

// Router.route('/admin/courses', { template: 'main', name: 'course.list' });
// Router.route('/admin/courses/:id', { template: 'main', name: 'course.show' });
// Router.route('/admin/courses/create', { template: 'main', name: 'course.create' });
// Router.route('/admin/courses/:id/edit', { template: 'main', name: 'course.edit' });

// Router.route('/admin/tutors', { template: 'main', name: 'tutor.list' });
// Router.route('/admin/tutors/:id', { template: 'main', name: 'tutor.show' });
// Router.route('/admin/tutors/create', { template: 'main', name: 'tutor.create' });
// Router.route('/admin/tutors/:id/edit', { template: 'main', name: 'tutor.edit' });

// Router.route('/admin/coupons', { template: 'main', name: 'coupon.list' });
// Router.route('/admin/coupons/:id', { template: 'main', name: 'coupon.show' });
// Router.route('/admin/coupons/create', { template: 'main', name: 'coupon.create' });
// Router.route('/admin/coupons/:id/edit', { template: 'main', name: 'coupon.edit' });


