/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

 import { prop, values, compose, partialRight, filter, 
    allPass, equals, omit, all, countBy, identity, propOr, gt, converge, has, not, isEmpty } from "ramda";
import { SHAPES, COLORS } from "../constants";

const isWhite = equals(COLORS.WHITE);
const isRed = equals(COLORS.RED);
const isGreen = equals(COLORS.GREEN);
const isBlue = equals(COLORS.BLUE);
const isOrange = equals(COLORS.ORANGE);
const getTriangle = prop(SHAPES.TRIANGLE);
const getCircle = prop(SHAPES.CIRCLE);
const getSquare = prop(SHAPES.SQUARE);
const getStar = prop(SHAPES.STAR);
const getAllColors = values
const count = countBy(identity);
const getAllExceptStarAndSquare = omit([SHAPES.STAR, SHAPES.SQUARE]);

const isAllExceptStarAndSquareWhite = compose(
    all(isWhite),
    getAllColors,
    getAllExceptStarAndSquare
)

const isTriangleGreen = compose(
    isGreen,
    getTriangle
)

const isSquareGreen = compose(
    isGreen,
    getSquare
)
const isStarRed = compose(
    isRed,
    getStar
)

const isCircleBlue = compose(
    isBlue,
    getCircle
)

const isSquareOrange = compose(
    isOrange,
    getSquare
)

const countInputColors = compose(
    count,
    getAllColors
)

const countGreenColors = compose(
    propOr(0, COLORS.GREEN),
    countInputColors
)

const countRedColors = compose(
    propOr(0, COLORS.RED),
    countInputColors
)

const countBlueColors = compose(
    propOr(0, COLORS.BLUE),
    countInputColors
)

const isThereMoreThanTwoNotWhite = compose(
    allPass([compose(not, has(COLORS.WHITE)), compose(not, isEmpty)]),
    filter(partialRight(gt, [2])),
    countInputColors
)

const isThereMoreThanOneGreen = compose(
    partialRight(gt, [1]),
    countGreenColors
)

const isThereTwoGreen = compose(
    partialRight(equals, [2]),
    countGreenColors
)

const isThereOneRed = compose(
    partialRight(equals, [1]),
    countRedColors
)

const areAllOrange = compose(
    all(isOrange),
    getAllColors
)

const areAllGreen = compose(
    all(isGreen),
    getAllColors
)

const isStarNotWhiteAndNotRed = compose(
    allPass([compose(not, isRed), compose(not, isWhite)]),
    getStar
)

const triangleAndSquareAreSameAndNowWhite = converge(allPass([equals, compose(not, isWhite)]), [getTriangle, getSquare]);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (input) => allPass([isSquareGreen, isStarRed, isAllExceptStarAndSquareWhite])(input);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (input) => isThereMoreThanOneGreen(input);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (input) => converge(equals, [countBlueColors, countRedColors])(input);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (input) => allPass([isCircleBlue, isStarRed, isSquareOrange])(input);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (input) => isThereMoreThanTwoNotWhite(input);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (input) => allPass([isTriangleGreen, isThereTwoGreen, isThereOneRed])(input);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (input) => areAllOrange(input);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (input) => isStarNotWhiteAndNotRed(input);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (input) => areAllGreen(input);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (input) => triangleAndSquareAreSameAndNowWhite(input);
