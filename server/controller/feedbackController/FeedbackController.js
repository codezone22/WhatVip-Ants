const Feedback = require("../../model/feedback/Feedback");
const successTemplate = require("../../templates/succesTemplate");
const errorTemplate = require("../../templates/errorTemplate");
const cloudinaryCustom = require("../../utils/cloudinaryCustom");
var nodemailer = require("nodemailer");

const sendMail = (email, title, content, images) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trainmodel0503@gmail.com",
      pass: "gbweaxmipkkxuwvq",
    },
  });

  var mailOptions = {
    from: "Shop watcher",
    to: email,
    subject: title,
    html: images ? htmlHasImage(content, images) : htmlNoImage(content),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).populate("user").exec();
    return successTemplate(
      res,
      feedbacks,
      "Get all feedbacks successfully!",
      200
    );
  } catch (error) {
    return errorTemplate(res, error.message);
  }
};
const responseFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { email, title, content, images } = req.body;
    const imageBuffer = [];
    const listImageBase64 = images;
    for (let i = 0; i < listImageBase64.length; i++) {
      const result = await cloudinaryCustom.uploader.upload(
        listImageBase64[i],
        {
          folder: "public/images/feedbacks",
        }
      );
      imageBuffer.push(result.secure_url);
    }
    const fb = await Feedback.findByIdAndUpdate(
      { _id: feedbackId },
      {
        $set: {
          response: {
            content: content,
            date: new Date(),
            imagesRsp: imageBuffer,
          },
          isResponsed: true,
        },
      }
    ).exec();
    const titleRes = "Phản hồi: " + title;
    sendMail(
      email,
      titleRes,
      content,
      imageBuffer
    );
    fb.save();
    return successTemplate(res, fb, "Responsed feedback successfully!", 200);
  } catch (error) {
    return errorTemplate(res, error.message);
  }
};
const feedbackOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { title, content, images } = req.body;

    const imageBuffer = [];
    const listImageBase64 = images;
    for (let i = 0; i < listImageBase64.length; i++) {
      const result = await cloudinaryCustom.uploader.upload(
        listImageBase64[i],
        {
          folder: "public/images/feedback",
        }
      );
      imageBuffer.push(result.secure_url);
    }
    let date = new Date();
    const feedback = await Feedback.create({
      user: userId,
      title: title,
      content: content,
      isResponsed: false,
      feedbackDate: date,
      imagesRv: imageBuffer,
    });
    return successTemplate(res, feedback, "Đóng góp ý kiến thành công!", 200);
  } catch (error) {
    return errorTemplate(res, error.message);
  }
};

function htmlHasImage(content, images) {
  let temp = images.map((item) => {
    return `<img src=${item} alt="cc"/>`;
  });

  let html = temp.join(" ");

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-font-size { font-size: 35px !important; } #u_content_heading_1 .v-line-height { line-height: 120% !important; } #u_content_text_1 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 10px 60px !important; } #u_content_text_4 .v-container-padding-padding { padding: 10px 10px 60px !important; } }
        </style>
      
      
    
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet" type="text/css">
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
    
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          
          
    <!
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
    <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 0px;font-family:'Open Sans',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-shop-store-icon-png-image_3563809.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:'Open Sans',sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_heading_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
            
            <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Playfair Display',serif; font-size: 30px; font-weight: 400;"><span><strong>SHOP APP</strong></span></h1>
            <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Playfair Display',serif; font-size: 20px; font-weight: 400;"><span><strong>Thương hiệu thời trang dẫn đầu xu thế</strong></span></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 30px 0px;font-family:'Open Sans',sans-serif;" align="left">
            
      <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 160%; text-align: justify; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 160%;"><strong>ShopApp xin chào,</strong></p>
    <p style="font-size: 14px; line-height: 160%;"> </p>
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;" id="container_image_feedback">
    ${html}
    </div>
    <p id="content_feedback" style="font-size: 14px; line-height: 160%; margin-top: 20px;">${content}</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_button_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
            
    
    <div align="left">
        <a href="https://www.unlayer.com" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #2f60c5; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:26%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
          <span class="v-line-height" style="display:block;padding:10px 20px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">Go To Us</span></strong></span>
        </a>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px 30px;font-family:'Open Sans',sans-serif;" align="left">
            
      <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 160%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 160%;">Thank you,</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      </div>
      </div>
    </div>
    
        </div>
      </div>
      </div>
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      
    
    </div>
      </div>
    </div>
        </div>
      </div>
      </div>
      
    <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      
    <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:'Open Sans',sans-serif;" align="left">
    
    
          </td>
        </tr>
      </tbody>
    </table>
    
    </div>
      </div>
    </div>
    
        </div>
      </div>
      </div>
    
        </td>
      </tr>
      </tbody>
      </table>
    
    </body>
    </html>
    `;
}
function htmlNoImage(content) {
  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-font-size { font-size: 35px !important; } #u_content_heading_1 .v-line-height { line-height: 120% !important; } #u_content_text_1 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 10px 60px !important; } #u_content_text_4 .v-container-padding-padding { padding: 10px 10px 60px !important; } }
        </style>
      
      
    
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet" type="text/css">
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
    
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          
          
    <!
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
    <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 0px;font-family:'Open Sans',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-shop-store-icon-png-image_3563809.jpg" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:'Open Sans',sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_heading_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
            
            <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Playfair Display',serif; font-size: 30px; font-weight: 400;"><span><strong>SHOP APP</strong></span></h1>
            <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Playfair Display',serif; font-size: 20px; font-weight: 400;"><span><strong>Thương hiệu thời trang dẫn đầu xu thế</strong></span></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 30px 0px;font-family:'Open Sans',sans-serif;" align="left">
            
      <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 160%; text-align: justify; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 160%;"><strong>ShopApp xin chào,</strong></p>
    <p style="font-size: 14px; line-height: 160%;"> </p>
    <div style="display: flex; align-items: center; margin-top: 20px;" id="container_image_feedback">
      
    </div>
    <p id="content_feedback" style="font-size: 14px; line-height: 160%; margin-top: 20px;">${content}</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_button_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
            
    
    <div align="left">
        <a href="https://www.unlayer.com" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #2f60c5; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:26%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
          <span class="v-line-height" style="display:block;padding:10px 20px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">Go To Us</span></strong></span>
        </a>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px 30px;font-family:'Open Sans',sans-serif;" align="left">
            
      <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 160%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 160%;">Thank you,</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      </div>
      </div>
    </div>
    
        </div>
      </div>
      </div>
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      
    
    </div>
      </div>
    </div>
        </div>
      </div>
      </div>
      
    <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      
    <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:'Open Sans',sans-serif;" align="left">
    
    
          </td>
        </tr>
      </tbody>
    </table>
    
    </div>
      </div>
    </div>
    
        </div>
      </div>
      </div>
    
        </td>
      </tr>
      </tbody>
      </table>
    
    </body>
    
    </html>
    `;
}

module.exports = {
  getAllFeedbacks,
  responseFeedback,
  feedbackOfUser,
};
