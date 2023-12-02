export const newsTemplate = (
  heading: string,
  subHeading: string,
  description: string,
  emailType: string
): string => {
  return `<div>
  <div
    style="
      display: none;
      font-size: 1px;
      color: #fefefe;
      line-height: 1px;
      font-family: 'Lato', Helvetica, Arial, sans-serif;
      max-height: 0px;
      max-width: 0px;
      opacity: 0;
      overflow: hidden;
    "
  >
   
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tbody>
      <tr>
        <td bgcolor="#114737" align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tbody>
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="padding: 40px 10px 40px 10px"
                ></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          bgcolor="#114737"
          align="center"
          style="padding: 0px 10px 0px 10px"
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tbody>
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="center"
                  valign="top"
                  style="
                    padding: 40px 20px 20px 20px;
                    border-radius: 4px 4px 0px 0px;
                    color: #111111;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 48px;
                    font-weight: 400;
                    letter-spacing: 4px;
                    line-height: 48px;
                  "
                >
                  <h2 style="font-size: 38px; font-weight: 400; margin: 2">
                    ${emailType}
                    <h3 style="font-size: 28px; font-weight: 400; margin: 2; color:green">
                        MMC
                    </h3>
                  </h2>
                  <img
                    src="https://img.icons8.com/clouds/100/000000/handshake.png"
                    width="125"
                    height="120"
                    style="display: block; border: 0px"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          bgcolor="#f4f4f4"
          align="center"
          style="padding: 0px 10px 0px 10px"
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tbody>
              <tr>
                <th
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 0px 20px 30px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    /* line-height: 25px; */
                  "
                >
                 <b>News Heading:</b>
                </th>
                <td
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 0px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    /* line-height: 25px; */
                  "
                >
                  ${heading}
                </td>
              </tr>
              <tr>
                <th
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 0px 20px 30px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    /* line-height: 25px; */
                  "
                >
                 <b> Sub Heading:</b>
                </th>
                <td
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 0px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    /* line-height: 25px; */
                  "
                >
                  ${subHeading}
                </td>
              </tr> <tr>
                <th
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 0px 20px 30px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    /* line-height: 25px; */
                  "
                >
                 <b> Description.:</b>
                </th>
                <td
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 0px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    /* line-height: 25px; */
                  "
                >
                  ${description}
                </td>
              </tr> 
              
              
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td
          bgcolor="#f4f4f4"
          align="center"
          style="padding: 30px 10px 0px 10px"
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tbody>
              <tr>
                <td
                  bgcolor="#70F09C"
                  align="center"
                  style="
                    padding: 30px 30px 30px 30px;
                    border-radius: 4px 4px 4px 4px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 25px;
                  "
                >
                 
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr></tr>
    </tbody>
  </table>
</div>`;
};
