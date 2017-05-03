Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
});

// login route
AccountsTemplates.configureRoute('signIn', {
  name: 'login',
  path: '/login',
  template: 'login',
  layoutTemplate: 'frontLayout',
  redirect: function(){
    if (Meteor.user().isAdmin()) {
      Router.go('dashboard');
    } else {
      Router.go('home');
    }
  }
});

AccountsTemplates.configureRoute('signUp', {
  name: 'register',
  path: '/register',
  template: 'register',
  layoutTemplate: 'frontLayout',
});

AccountsTemplates.configureRoute('resetPwd', {
  template: 'resetPwd',
  layoutTemplate: 'frontLayout',
});

AccountsTemplates.configureRoute('forgotPwd', {
  template: 'forgotPwd',
  layoutTemplate: 'frontLayout',
});


// user route
Router.route('/', { layoutTemplate: 'frontLayout', template: 'home', name: 'home' });
Router.route('/profile', { layoutTemplate: 'frontLayout', template: 'userProfile', name: 'user_profile' });
Router.route('/schools', { layoutTemplate: 'frontLayout', template: 'schoolListView', name: 'school_list_view' });
Router.route('/schools/:id', { layoutTemplate: 'frontLayout', template: 'schoolDetailView', name: 'school_detail_view' });
Router.route('/tutors/', { layoutTemplate: 'frontLayout', template: 'tutorListView', name: 'tutor_list_view' });
Router.route('/tutors/:id', { layoutTemplate: 'frontLayout', template: 'tutorDetailView', name: 'tutor_detail_view' });
Router.route('/courses/', { layoutTemplate: 'frontLayout', template: 'courseListView', name: 'course_list_view' });
Router.route('/courses/:id', { layoutTemplate: 'frontLayout', template: 'courseDetailView', name: 'course_detail_view' });
Router.route('/coupons/', { layoutTemplate: 'frontLayout', template: 'couponListView', name: 'coupon_list_view' });
Router.route('/coupons/:id', { layoutTemplate: 'frontLayout', template: 'couponDetailView', name: 'coupon_detail_view' });
Router.route('/contactus', { layoutTemplate: 'frontLayout', template: 'contactView', name: 'contact_view' });

Router.route('/writeareview/:type/:id', { layoutTemplate: 'frontLayout', template: 'reviewComposeView', name: 'review_compose_view' });
Router.route('/search', { layoutTemplate: 'frontLayout', template: 'searchResult', name: 'search_result_view' });


// admin route
Router.route('/admin', { layoutTemplate: 'dashboardLayout', template: 'dashboard', name: 'dashboard' });
Router.route('/admin/profile', { layoutTemplate: 'dashboardLayout', template: 'adminProfile', name: 'admin_profile' });
Router.route('/admin/upload', { layoutTemplate: 'dashboardLayout', template: 'uploadForm', name: 'admin_upload' });

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
Router.route('/admin/schools/:id/assign', { layoutTemplate: 'dashboardLayout', template: 'schoolAssign', name: 'school_assign' });

Router.route('/admin/tutors', { layoutTemplate: 'dashboardLayout', template: 'tutorList', name: 'tutor_list' });
Router.route('/admin/tutors/create', { layoutTemplate: 'dashboardLayout', template: 'tutorCreate', name: 'tutor_create' });
Router.route('/admin/tutors/:id', { layoutTemplate: 'dashboardLayout', template: 'tutorShow', name: 'tutor_show' });
Router.route('/admin/tutors/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'tutorEdit', name: 'tutor_edit' });

Router.route('/admin/reviews', { layoutTemplate: 'dashboardLayout', template: 'reviewList', name: 'review_list' });
Router.route('/admin/reviews/create', { layoutTemplate: 'dashboardLayout', template: 'reviewCreate', name: 'review_create' });
Router.route('/admin/reviews/:id', { layoutTemplate: 'dashboardLayout', template: 'reviewShow', name: 'review_show' });
Router.route('/admin/reviews/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'reviewEdit', name: 'review_edit' });

Router.route('/admin/articles', { layoutTemplate: 'dashboardLayout', template: 'articleList', name: 'article_list' });
Router.route('/admin/articles/create', { layoutTemplate: 'dashboardLayout', template: 'articleCreate', name: 'article_create' });
Router.route('/admin/articles/:id', { layoutTemplate: 'dashboardLayout', template: 'articleShow', name: 'article_show' });
Router.route('/admin/articles/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'articleEdit', name: 'article_edit' });

Router.route('/admin/tags', { layoutTemplate: 'dashboardLayout', template: 'tagList', name: 'tag_list' });
Router.route('/admin/tags/create', { layoutTemplate: 'dashboardLayout', template: 'tagCreate', name: 'tag_create' });
Router.route('/admin/tags/:id', { layoutTemplate: 'dashboardLayout', template: 'tagShow', name: 'tag_show' });
Router.route('/admin/tags/:id/edit', { layoutTemplate: 'dashboardLayout', template: 'tagEdit', name: 'tag_edit' });

Tracker.autorun(function () {
  var current = Router.current();
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});






// Router.onBeforeAction(function () {

//   // if (Meteor.user() != undefined) {
//   //   if ((Meteor.user().hasOwnProperty('roles')) && !Roles.userIsInRole(Meteor.user(), ['admin', 'school-admin'])) {
//   //     console.log("user not admin", Meteor.userId())
//   //     // if the user is not logged in, render the Login template
//   //     Router.go('home');
//   //   } else if (!Meteor.userId()) {
//   //     console.log("not logged in", Meteor.userId())
//   //     // if the user is not logged in, render the Login template
//   //     Router.go('home');
//   //   } else {
//   //     // otherwise don't hold up the rest of hooks or our route/action function
//   //     // from running
//   //     this.next();
//   //   }
//   // } else {
//   //   this.next();
//   // }
//   this.next()
// }, {
//   only: [
//     'dashboard',
//     'coupon_list','coupon_create','coupon_show','coupon_edit', 
//     'course_list','course_create','course_show','course_edit',
//     'school_list','school_create','school_show','school_edit',
//     'tutor_list','tutor_create','tutor_show','tutor_edit',
//     'review_list','review_create','review_show','review_edit',
//     ]
// });
