module.exports.mapSurveyToClient = function(survey) {
    return {
        id: survey._id,
        name: survey.name,
        points: survey.points.map((point) => ({
            id: point._id,
            name: point.name,
        })),
        surveyType: survey.surveyType,
    }
};

module.exports.SurveyTypes = {
  mainPage: 'mainpage',
};