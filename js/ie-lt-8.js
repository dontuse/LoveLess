$(function(){
    $('.b-text ul li').prepend('<div class="li-ie-before">→</div>');

    $('.b-text ol li').each(function(i){
        var i = i+1;
        $(this).prepend('<span class="li-ie-before">'+i+'. </span>')
    });
});