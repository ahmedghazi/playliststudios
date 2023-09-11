import { Component } from "react";

class FaviconLetter extends Component {
  componentDidMount() {
    console.log(this.props);
    const { texte, background, foreground } = this.props;
    const favicon = document.querySelector("link[rel='icon']");
    // console.log(favicon);

    const faviconSize = 64;
    const faviconSizeHalf = faviconSize / 2;

    const fontStyle = faviconSizeHalf + "pt Arial";

    const canvas = document.createElement("canvas");
    canvas.width = faviconSize;
    canvas.height = faviconSize;

    const context = canvas.getContext("2d");
    const img = document.createElement("img");
    img.src = favicon.href;
    // console.log(fontStyle)
    img.onload = () => {
      // Draw Original Favicon as Background
      context.drawImage(img, 0, 0, faviconSize, faviconSize);

      context.beginPath();
      context.fillStyle = background;
      //context.strokeStyle = "black";
      context.font = fontStyle;
      context.textAlign = "center";
      context.textBaseline = "top";

      //const textHeight = this.getTextHeight(context.font, fontStyle)
      // context.fillRect(0, 0, faviconSize, faviconSize);
      context.arc(
        faviconSize / 2,
        faviconSize / 2,
        faviconSize / 2,
        0,
        2 * Math.PI,
        false
      );
      // context.fillStyle = "green";
      console.log(texte);
      context.fill();
      context.beginPath();
      context.fillStyle = foreground;
      context.fillText(texte, faviconSizeHalf, faviconSizeHalf / 2 - 1);
      context.fill();

      // Replace favicon
      favicon.href = canvas.toDataURL("image/jpg");
    };
  }

  //   getTextHeight(txt, font) {
  //     var el = document.createElement("div"),
  //       height;
  //     el.style.cssText =
  //       "position:fixed;padding:0;left:-9999px;top:-9999px;font:" + font;
  //     el.textContent = txt;

  //     document.body.appendChild(el);
  //     height = parseInt(getComputedStyle(el).getPropertyValue("height"), 10);
  //     document.body.removeChild(el);

  //     return height;
  //   }

  render() {
    return null;
  }
}

export default FaviconLetter;
