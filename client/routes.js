Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
});

// user route
Router.route('/', { layoutTemplate: 'frontLayout', template: 'home', name: 'home' });
Router.route('/schools', { layoutTemplate: 'frontLayout', template: 'schoolListView', name: 'school_list_view' });
Router.route('/schools/:id', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
// Router.route('/schools/:school_id/tutors/', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
// Router.route('/schools/:school_id/tutors/:id', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
// Router.route('/courses/', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
// Router.route('/courses/:id', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
// Router.route('/coupons/', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
// Router.route('/coupons/:id', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });

// admin route
Router.route('/admin', { layoutTemplate: 'dashboardLayout', template: 'dashboard', name: 'dashboard' });

Router.route('/admin/coupons', { layoutTemplate: 'dashboardLayout', template: 'couponList', name: 'coupon_list' });
Router.route('/admin/coupons/create', { layoutTemplate: 'dashboardLayout', template: 'couponCreate', name: 'coupon_create' });
Router.route('/admin/coupons/:id', { layoutTemplate: 'dashboardLayout', template: 'couponShow', name: 'coupon_show' });
Router.route('/admin/coupons/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'couponEdit', name: 'coupon_edit' });

Router.route('/admin/courses', { layoutTemplate: 'dashboardLayout', template: 'courseList', name: 'course_list' });
Router.route('/admin/courses/create', { layoutTemplate: 'dashboardLayout', template: 'courseCreate', name: 'course_create' });
Router.route('/admin/courses/:id', { layoutTemplate: 'dashboardLayout', template: 'courseShow', name: 'course_show' });
Router.route('/admin/courses/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'courseEdit', name: 'course_edit' });

Router.route('/admin/schools', { layoutTemplate: 'dashboardLayout', template: 'schoolList', name: 'school_list' });
Router.route('/admin/schools/create', { layoutTemplate: 'dashboardLayout', template: 'schoolCreate', name: 'school_create' });
Router.route('/admin/schools/:id', { layoutTemplate: 'dashboardLayout', template: 'schoolShow', name: 'school_show' });
Router.route('/admin/schools/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'schoolEdit', name: 'school_edit' });

Router.route('/admin/tutors', { layoutTemplate: 'dashboardLayout', template: 'tutorList', name: 'tutor_list' });
Router.route('/admin/tutors/create', { layoutTemplate: 'dashboardLayout', template: 'tutorCreate', name: 'tutor_create' });
Router.route('/admin/tutors/:id', { layoutTemplate: 'dashboardLayout', template: 'tutorShow', name: 'tutor_show' });
Router.route('/admin/tutors/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'tutorEdit', name: 'tutor_edit' });

Router.route('/admin/reviews', { layoutTemplate: 'dashboardLayout', template: 'reviewList', name: 'review_list' });
Router.route('/admin/reviews/create', { layoutTemplate: 'dashboardLayout', template: 'reviewCreate', name: 'review_create' });
Router.route('/admin/reviews/:id', { layoutTemplate: 'dashboardLayout', template: 'reviewShow', name: 'review_show' });
Router.route('/admin/reviews/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'reviewEdit', name: 'review_edit' });

// Helpers
Template.registerHelper("log", function(something) {
  console.log('view:', something);
});

