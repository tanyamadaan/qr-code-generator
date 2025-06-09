import { USECASES } from "../assets/constants";
import { finaldata } from "../utils";

type JsonObject = Record<string, any>;

function qrData(): string {
    const schema = JSON.stringify(USECASES[0].initialValue, null, 2)
    const qrkey = JSON.stringify(USECASES[0].placeholders, null, 2);
    const mergedObj = finaldata(JSON.parse(schema))
    console.log(qrkey)
    const QrData = JSON.stringify(mergedObj);
    console.log(qrkey)
    return QrData
}

export const QrData = qrData();


// function finaldata(inputObj: JsonObject, additionalValues: JsonObject = {}): JsonObject {
// 	let mergedObj: JsonObject = {};

// 	if (!inputObj.context) {
// 		mergedObj = inputObj
// 	}
// 	else {
// 		// Flatten the nested objects inside context and message
// 	const flattenedContext = flattenObject(inputObj.context, "context");
// 	const flattenedMessage = flattenObject(
// 		inputObj.message.intent,
// 		"message.intent"
// 	);
// 	// Merge the flattened objects and additional values
// 	mergedObj = {
// 		...flattenedContext,
// 		...flattenedMessage,
// 		...additionalValues,
// 	};
// 	console.log(mergedObj)
// 	}
	
// 	return mergedObj
// }