/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://wxbb9ei4y4.execute-api.us-east-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.apiV1ParametersActivityGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersActivityGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersActivityOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersActivityCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersActivityCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityDeleteIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersActivityDeleteIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityDeleteIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityDeleteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersActivityDeleteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityDeleteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivitySearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersActivitySearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivitySearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivitySearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersActivitySearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivitySearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityStepIdCaregiverGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'date', 'Authorization'], ['body']);
        
        var apiV1ParametersActivityStepIdCaregiverGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/step/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityStepIdCaregiverGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityStepIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersActivityStepIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/step/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityStepIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersActivityIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersActivityIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersActivityIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/activity/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersActivityIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersFoodGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization', 'body'], ['body']);
        
        var apiV1ParametersFoodCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDailyMealIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersFoodDailyMealIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/dailyMeal/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDailyMealIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDailyMealIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodDailyMealIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/dailyMeal/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDailyMealIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDeficitIdCaregiverGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'date', 'Authorization'], ['body']);
        
        var apiV1ParametersFoodDeficitIdCaregiverGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/deficit/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDeficitIdCaregiverGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDeficitIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodDeficitIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/deficit/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDeficitIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDeleteFoodIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['foodId', 'Authorization'], ['body']);
        
        var apiV1ParametersFoodDeleteFoodIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/delete/{foodId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['foodId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDeleteFoodIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDeleteFoodIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodDeleteFoodIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/delete/{foodId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDeleteFoodIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDeleteByDateDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersFoodDeleteByDateDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/deleteByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDeleteByDateDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodDeleteByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodDeleteByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/deleteByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodDeleteByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodSearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersFoodSearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodSearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodSearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodSearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodSearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersFoodIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersFoodIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersFoodIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/food/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersFoodIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersHeartRateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersHeartRateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateCheckIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization', 'id'], ['body']);
        
        var apiV1ParametersHeartRateCheckIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/check/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateCheckIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateCheckIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersHeartRateCheckIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/check/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateCheckIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersHeartRateCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersHeartRateCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateDeleteIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersHeartRateDeleteIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateDeleteIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateDeleteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersHeartRateDeleteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateDeleteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateSearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersHeartRateSearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateSearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateSearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersHeartRateSearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateSearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersHeartRateIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersHeartRateIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersHeartRateIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/heartRate/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersHeartRateIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersMessageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1ParametersMessageCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageDeleteIdMessageDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idMessage', 'Authorization'], ['body']);
        
        var apiV1ParametersMessageDeleteIdMessageDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/delete/{idMessage}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idMessage', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageDeleteIdMessageDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageDeleteIdMessageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageDeleteIdMessageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/delete/{idMessage}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageDeleteIdMessageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageDestinatarioIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersMessageDestinatarioIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/destinatario/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageDestinatarioIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageDestinatarioIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageDestinatarioIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/destinatario/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageDestinatarioIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageMittenteIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersMessageMittenteIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/mittente/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageMittenteIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageMittenteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageMittenteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/mittente/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageMittenteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageSearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersMessageSearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageSearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageSearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageSearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageSearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageSearchByTopicGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['topic', 'Authorization'], ['body']);
        
        var apiV1ParametersMessageSearchByTopicGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/searchByTopic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['topic', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageSearchByTopicGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageSearchByTopicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageSearchByTopicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/searchByTopic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageSearchByTopicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersMessageIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersMessageIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersMessageIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/message/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersMessageIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersSleepGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSleepOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepCheckIdCaregiverGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'date', 'Authorization'], ['body']);
        
        var apiV1ParametersSleepCheckIdCaregiverGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/check/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepCheckIdCaregiverGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepCheckIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSleepCheckIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/check/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepCheckIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersSleepCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSleepCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepDeleteIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersSleepDeleteIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepDeleteIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepDeleteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSleepDeleteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepDeleteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepSearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersSleepSearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepSearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepSearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSleepSearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepSearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersSleepIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSleepIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSleepIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/sleep/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSleepIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2Get = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersSpo2GetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2GetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2Options = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSpo2OptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2OptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2CheckIdCaregiverGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'date', 'Authorization'], ['body']);
        
        var apiV1ParametersSpo2CheckIdCaregiverGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/check/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2CheckIdCaregiverGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2CheckIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSpo2CheckIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/check/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2CheckIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2CreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersSpo2CreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2CreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2CreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSpo2CreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2CreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2DeleteIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersSpo2DeleteIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2DeleteIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2DeleteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSpo2DeleteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2DeleteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2SearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersSpo2SearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2SearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersSpo2SearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersSpo2SearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/spo2/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersSpo2SearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ParametersWeightGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersWeightOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightCheckIdCaregiverGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'date', 'Authorization'], ['body']);
        
        var apiV1ParametersWeightCheckIdCaregiverGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/check/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightCheckIdCaregiverGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightCheckIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersWeightCheckIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/check/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightCheckIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1ParametersWeightCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersWeightCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightDeleteIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersWeightDeleteIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightDeleteIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightDeleteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersWeightDeleteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightDeleteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightSearchByDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['date', 'Authorization'], ['body']);
        
        var apiV1ParametersWeightSearchByDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['date', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightSearchByDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightSearchByDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersWeightSearchByDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/searchByDate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightSearchByDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1ParametersWeightIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ParametersWeightIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ParametersWeightIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/parameters/weight/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ParametersWeightIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RegistrationCaregiverPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var apiV1RegistrationCaregiverPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/registration/caregiver').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RegistrationCaregiverPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RegistrationCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RegistrationCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/registration/caregiver').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RegistrationCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RegistrationDoctorPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var apiV1RegistrationDoctorPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/registration/doctor').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RegistrationDoctorPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RegistrationDoctorOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RegistrationDoctorOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/registration/doctor').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RegistrationDoctorOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersAuthenticatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var apiV1UsersAuthenticatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/authenticate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersAuthenticatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersAuthenticateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersAuthenticateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/authenticate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersAuthenticateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersDeleteIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1UsersDeleteIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersDeleteIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersDeleteIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersDeleteIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/delete/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersDeleteIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersLinkedUserIdDoctorIdCaregiverPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idDoctor', 'idCaregiver'], ['body']);
        
        var apiV1UsersLinkedUserIdDoctorIdCaregiverPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/linkedUser/{idDoctor}/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idDoctor', 'idCaregiver'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersLinkedUserIdDoctorIdCaregiverPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersLinkedUserIdDoctorIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersLinkedUserIdDoctorIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/linkedUser/{idDoctor}/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersLinkedUserIdDoctorIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersSearchByEmailGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['email'], ['body']);
        
        var apiV1UsersSearchByEmailGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/searchByEmail').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['email']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersSearchByEmailGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersSearchByEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersSearchByEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/searchByEmail').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersSearchByEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUpdateCaloriesThresholdIdCaregiverPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'Authorization', 'body'], ['body']);
        
        var apiV1UsersUpdateCaloriesThresholdIdCaregiverPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/update/caloriesThreshold/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUpdateCaloriesThresholdIdCaregiverPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUpdateCaloriesThresholdIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersUpdateCaloriesThresholdIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/update/caloriesThreshold/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUpdateCaloriesThresholdIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUpdateStepsThresholdIdCaregiverPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idCaregiver', 'Authorization', 'body'], ['body']);
        
        var apiV1UsersUpdateStepsThresholdIdCaregiverPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/update/stepsThreshold/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idCaregiver', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUpdateStepsThresholdIdCaregiverPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUpdateStepsThresholdIdCaregiverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersUpdateStepsThresholdIdCaregiverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/update/stepsThreshold/{idCaregiver}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUpdateStepsThresholdIdCaregiverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUpdateIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id', 'body'], ['body']);
        
        var apiV1UsersUpdateIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/update/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUpdateIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUpdateIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersUpdateIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/update/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUpdateIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1UsersIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
