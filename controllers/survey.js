const Survey = require('../models/Survey');
const SurveyAnswer = require('../models/SurveyAnswer');
const errorHandler = require('../utils/errorHandlers');
const usersUtils = require('../utils/userUtils');
const surveyUtils = require('../utils/surveyUtils');

module.exports.create = async function (request, response) {
    const { name, points, surveyType } = request.body;

    if (request.user.role !== usersUtils.UsersRole.Admin) {
        return response.status(403).json({
            message: "Permission denied",
        })
    }

    if (!name || !points || !points.length || !surveyType) {
        return response.status(400).json({ message: 'Bad request' });
    }

    const newSurvey = new Survey({
        name,
        points,
        surveyType: surveyType.toLowerCase(),
    });

    try {
        const survey = await newSurvey.save();
        const clientSurvey = surveyUtils.mapSurveyToClient(survey);

        if (surveyType.toLowerCase() === surveyUtils.SurveyTypes.mainPage) {
            await Survey.deleteMany({
                surveyType: surveyUtils.SurveyTypes.mainPage,
                _id: {$ne: survey.id}
            });
        }

        response.status(201).json(clientSurvey);
    } catch (e) {
        errorHandler(e)
    }
};

module.exports.setAnswer = async function (request, response) {
    const { surveyId, pointId, value } = request.body;


    if (!surveyId || !pointId || value === undefined) {
        return response.status(400).json({ message: 'Bad request' });
    }

    const newSurveyAnswer = new SurveyAnswer({
        userId: request.body.id,
        surveyId,
        pointId,
        value,
    });

    try {
        const newAnswer = await newSurveyAnswer.save();
        await SurveyAnswer.deleteMany({
            $and: [
                { userId: request.body.id },
                { surveyId }
            ],
            _id: { $ne: newAnswer._id }
        });

        return response.status(201).json({
            id: newAnswer._id,
        })
    } catch (e) {
        errorHandler(e);
    }
};

module.exports.getPageSurvey = async function (request, response) {
    const { surveyType } = request.body;
    const { user } = request;

    if (!surveyType) {
        return response.status(400).json({ message: 'Bad request' });
    }

    try {
        const survey = await Survey.findOne({
            surveyType: surveyType.toLowerCase(),
        });

        if (!survey) {
            return response.status(404).json({ message: 'Not Found' });
        }

        const surveyAnswer = await SurveyAnswer.findOne({
            $and: [
                { userId: user.id },
                { surveyId: survey._id}
            ],
        });

        response.status(200).json({
            survey: surveyUtils.mapSurveyToClient(survey),
            answer: surveyAnswer ? {
                    pointId: surveyAnswer.pointId,
                    value: surveyAnswer.value,
                } :
                undefined
        });
    } catch (e) {
        errorHandler(e);
    }
};