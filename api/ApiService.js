const METEO_API_URL = 'https://api.open-meteo.com';
const METEO_API_VERSION = 'v1';
const TIMEZONE = 'Europe%2FBerlin'

const methods = {
    get: 'GET',
    post: 'POST'
}

const endpoints = {
    getMeteo: {
        method: methods.get,
        path: `${METEO_API_URL}/${METEO_API_VERSION}/forecast?latitude={{latitude}}&longitude={{longitude}}&current_weather=true&current_weather=true&timezone=${TIMEZONE}`,
        populate: true
    }
}

const populatePath = (urlPath, params) => {
    let populatedPath = urlPath;
    const processingParameters = Object.entries(params);
    const paramsToProcess = {};
    for (const [key, value] of processingParameters) {
        const token = `{{${key}}}`;
        if (urlPath.includes(token)) {
            populatedPath = populatedPath.split(token).join(value);
        } else {
            paramsToProcess[key] = value;
        }
    }
    return {
        populatedPath,
        paramsToProcess,
    };
};

export const getMeteo = async ({ params, signal }) => {
    const { populatedPath, paramsToProcess } = populatePath(endpoints.getMeteo.path, params);

    const url = new URL(populatedPath);

    try {
        const result = await (
            await fetch(url, { signal })
        ).json();
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}
