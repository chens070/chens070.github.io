var current_count = $('.item-count').html(),
  current_value = Math.abs(current_count),
  new_count     = current_value + 1;

  $('.item-count').html(new_count);
  // add in-cart class to items that have been clicked
  $(this).addClass('in-cart');
  }
});