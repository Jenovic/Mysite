import * as path from 'path';
import * as pdf from 'html-pdf';

export default (res, viewPath: string, data): Promise<Buffer> =>
  new Promise((resolve) => {
    const filename = path.join(
      `${path.dirname(require.main.filename)}/views/${viewPath}.hbs`,
    );
    res.render(filename, data, (err, html) => {
      pdf
        .create(html, {
          format: 'A4',
          base: `file://${path.dirname(require.main.filename)}/assets/`,
        })
        .toBuffer((err, buffer: Buffer) => {
          resolve(buffer);
        });
    });
  });
