import * as csv from 'fast-csv';
import * as moment from 'moment';

export default (res, name: string, headers: string[], rows: any[][]) => {
  const filename = `medenta-${name}-results-${moment().format(
    'YYYY-MM-DD-HH-mm-ss',
  )}`;

  res.writeHead(200, {
    'content-Type': 'application/csv',
    'content-Disposition': `attachment; filename=${filename}.csv`,
  });

  csv
    .write([headers].concat(rows), {
      delimiter: ',',
    })
    .pipe(res);
};
