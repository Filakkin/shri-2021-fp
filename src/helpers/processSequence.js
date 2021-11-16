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
import { gt, lt, pipe, compose, curry, pipeWith, allPass, andThen, tap, test, ifElse, prop, length, __ } from 'ramda';
import Api from '../tools/api';

const api = new Api();

const greaterThanTwo = gt(__, 2);
const lessThanTen = lt(__, 10);
const isStringLongerThanTwo = compose(greaterThanTwo, length);
const isStringShorterThanTen = compose(lessThanTen, length);
const getPowerOfTwo = curry(Math.pow)(__, 2);
const getMod3 = (num) => num % 3;
const castToNumber = Number;
const roundToInt = Math.round;
const callApiAndGetResult = (num) => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: num });
const callApiToGetAnimal = (num) => api.get(`https://animals.tech/${num}`, {})
const getApiResult = prop('result');
const validateString = allPass([isStringLongerThanTwo, isStringShorterThanTen, test(/^[0-9]+\.?[0-9]+/)])

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const tapToLog = tap(writeLog);
    pipe(
        tapToLog,
        ifElse(
            validateString,
            pipe(
                castToNumber,
                roundToInt,
                tapToLog,
                pipeWith(andThen)([
                    callApiAndGetResult,
                    getApiResult,
                    tapToLog,
                    length,
                    tapToLog,
                    getPowerOfTwo,
                    tapToLog,
                    getMod3,
                    tapToLog,
                    callApiToGetAnimal,
                    getApiResult,
                    handleSuccess
                ])
            ),
            () => handleError('ValidationError')
        )
    )(value)
}

export default processSequence;
