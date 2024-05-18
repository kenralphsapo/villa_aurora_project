
let sectionArray = [1, 2, 3, 4, 5];

$.each(sectionArray, function(index, value){
          
    document.addEventListener('scroll', function() {
        let offsetSection = $('#' + 'section_' + value).offset().top - 0;
        let docScroll = $(document).scrollTop();
        let docScroll1 = docScroll + 1;
    
        if (docScroll1 >= offsetSection) {
            $('#sidebarMenu .nav-link').removeClass('active');
            $('#sidebarMenu .nav-link:link').addClass('inactive');
            $('#sidebarMenu .nav-item .nav-link').eq(index).addClass('active');
            $('#sidebarMenu .nav-item .nav-link').eq(index).removeClass('inactive');
        }
    });
    
    
    $('.click-scroll').eq(index).click(function(e){
        let offsetClick = $('#' + 'section_' + value).offset().top - 0;
        e.preventDefault();
        $('html, body').animate({
            'scrollTop':offsetClick
        }, 300)
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    let navLinks = document.querySelectorAll('#sidebarMenu .nav-item .nav-link:link');
    
    navLinks.forEach(function(link) {
        link.classList.add('inactive');
    });
    
    let firstLink = document.querySelector('#sidebarMenu .nav-item .nav-link');
    firstLink.classList.add('active');
    firstLink.classList.remove('inactive');
});


