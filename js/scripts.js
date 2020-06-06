
$(function() {
//Login button modal show
   $("#loginButton").click(function(){
    $("#loginModal").modal("show");
    // if ($(".close").modal("hide"));
 //Login button modal hide
  });
  $(".close").click(function(){
    $("#loginModal").modal("hide");

  });
//Reserve button modal show
    $("#reserveButton").click(function(){
    $("#reserveModal").modal("show")
    });
//Login button modal hide
    $(".close").click(function(){
        $("#reserveModal").modal("hide");
    
      });


    });
//Quote of the day
    let quotes = [
    '"Smile, breathe, and go slowly." -Thich Nhat Hanh ', 
    '"Inner peace begins the moment you choose not to allow another person or event to control your emotions."— Pema Chodron', 
    '"Trust yourself. You’ve survived a lot, and you’ll survive whatever is coming."– Robert Tew', 
    '"Nothing diminishes anxiety faster than action."— Walter Anderson', 
    '"Life is ten percent what you experience and ninety percent how you respond to it."— Dorothy M. Neddermeyer',
  '"You don’t have to control your thoughts. You just have to stop letting them control you."— Dan Millman',
  '"Good humor is a tonic for mind and body. It is the best antidote for anxiety and depression. It is a business asset. It attracts and keeps friends. It lightens human burdens. It is the direct route to serenity and contentment."— Grenville Kleiser',
'"Do not anticipate trouble, or worry about what may never happen. Keep in the sunlight."— Benjamin Franklin']

    function randomQuotes() {
        let i = Math.floor(Math.random() * quotes.length)
        document.getElementById('quote').innerHTML = quotes[i]
    }
//accordian
    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}