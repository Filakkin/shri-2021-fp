/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import { pipe, pipeWith, andThen, tap, test, ifElse, prop, length } from 'ramda';
 import Api from '../tools/api';
 
 const api = new Api();
 
 
 const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
     pipe(
         tap(writeLog),
         ifElse(
             test(/^([1-9]|(0\\.)){1}[0-9\\.]{2,8}/),
             pipe(
                 (str) => Number(str),
                 (num) => Math.round(num),
                 tap(writeLog),
                 pipeWith(andThen)([
                    (num) => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: num }),
                     prop('result'),
                     tap(writeLog),
                     length,
                     tap(writeLog),
                     (num) => Math.pow(num, 2),
                     tap(writeLog),
                     (num) => num % 3,
                     tap(writeLog),
                     (num) => api.get(`https://animals.tech/${num}`, {}),
                     prop('result'),
                     handleSuccess
                 ])
             ),
             () => handleError('ValidationError')
         )
     )(value)
 }
 
 export default processSequence;
 