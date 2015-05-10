$( document ).ready(function() {
  console.log( "ready!" );
  var menuMappings = {
    home: '/',
    projects: '/projects.html',
    about: '/about.html'
  };
  $('.blog-nav-item').click(function(){
    console.log( "We clicked!!!" );
    $('.blog-nav-item').removeClass('active');
    this.addClass('active');
  });
});
