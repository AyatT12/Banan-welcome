let canvas_width = 2481;

let loadImageOnCanvasAndThenWriteText = (canvas, imageUrl, texts, textStyleOptions, Images) => {
  let ctx = canvas.getContext("2d");

  let img = new Image();

  img.onload = () => {
    let loadedImageWidth = img.width;
    let loadedImageHeight = img.height;

    canvas.width = loadedImageWidth;
    canvas.height = loadedImageHeight;

    ctx.drawImage(img, 0, 0);

    texts.forEach(text => {
      ctx.font = `${textStyleOptions.fontWeight} ${textStyleOptions.fontSize}px ${textStyleOptions.fontFamily}`;
      ctx.fillStyle = textStyleOptions.textColor;

      let textWidth = ctx.measureText(text.content).width;

      let x = text.x;

      const align = text.align || textStyleOptions.textAlign;

      if (align === "right") {
        x -= textWidth; 
      } else if (align === "center") {
        x -= textWidth / 2; 
      }

      ctx.fillText(text.content, x, text.y);
    });

    Images.forEach(signature => {
      let signatureWidth = ctx.measureText(signature.content).width;

      let x = signature.x;

      if (textStyleOptions.textAlign === "right") {
        x -= signatureWidth;
      } else if (textStyleOptions.textAlign === "center") {
        x -= signatureWidth / 2;
      }

      ctx.drawImage(signature.content, x, signature.y, signature.width, signature.height);
      console.log(signature);    
    });

    let base64Link = canvas.toDataURL("image/png");
    console.log(base64Link);
  };

  img.src = imageUrl;
  console.log(img.src);
};

document.addEventListener("DOMContentLoaded", () => {
  let theCanvas = document.getElementById("myCanvas");

  let imageUrl = "Welcome Messege- Programmer Template-01.png";
  var QrImg = new Image();

  QrImg.src = "BananT.png";

  let texts = [
    { content: "شركة كدي لتأجير السيارات", x: canvas_width - 1260, y: 1151, align: "right" },
    { content: "Kadi Car Rental Company", x: canvas_width - 2145, y: 1557, align: "left" },
  ];

  let Images = [
    { content: QrImg, x: canvas_width - 1450, y: 635, width: 395, height: 400 },
  ];

  let textStyleOptions = {
    fontWeight: "bold",
    fontSize: 50,
    fontFamily: "Sakkal Majalla Bold",
    textColor: "#4c3715",
    textAlign: "right"
  };

  // Ensure the font is loaded
  document.fonts.load(`bold 50px "${textStyleOptions.fontFamily}"`).then(() => {
    loadImageOnCanvasAndThenWriteText(theCanvas, imageUrl, texts, textStyleOptions, Images);
  });
});
