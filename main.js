document.getElementById("file-input").addEventListener("change", function() {
  let fileInput = this;
  let displayedImage = document.getElementById("displayed-image");
  
  if (fileInput.files.length > 0) {
    let file = fileInput.files[0];
    let reader = new FileReader();
    
    reader.onload = function(e) {
      displayedImage.src = e.target.result;
      displayedImage.style.display = "block"; // إظهار الصورة بعد اختيارها
    };
    
    reader.readAsDataURL(file);
  }
});

document.getElementById("upload-btn").addEventListener("click", function() {
  let fileInput = document.getElementById("file-input");
  
  if (fileInput.files.length > 0) {
    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("chat_id", "1773142886"); // ضع معرف الدردشة الخاص بك
    formData.append("photo", file);
    
    let botToken = "6287517448:AAHt1gKb8ot6pq2mFf6DMpc9ws0Lvt-kyMo"; // ضع توكن البوت الخاص بك
    
    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          alert("تم إرسال الصورة بنجاح!");
        } else {
          alert("حدث خطأ أثناء إرسال الصورة: " + data.description);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("فشل الاتصال بالسيرفر.");
      });
  } else {
    alert("يرجى اختيار صورة أولاً!");
  }
});