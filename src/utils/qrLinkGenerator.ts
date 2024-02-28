// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonObject = Record<string, any>;

export function transformJSON(
	inputJSON: string,
	additionalValues: JsonObject = {}
): string | null {
	try {
		// Parse the input JSON string
		const inputObj: JsonObject = JSON.parse(inputJSON);

		// Flatten the nested objects inside context and message
		const flattenedContext = flattenObject(inputObj.context, "context");
		const flattenedMessage = flattenObject(
			inputObj.message.intent,
			"message.intent"
		);

		// Merge the flattened objects and additional values
		const mergedObj = {
			...flattenedContext,
			...flattenedMessage,
			...additionalValues,
		};

		// Convert the merged object to a query string
		const queryString = Object.entries(mergedObj)
			.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
			.join("&");

		// Construct the final beckn URL
		const becknURL = `beckn://ondc?${queryString}`;

		return becknURL;
	} catch (error) {
		console.error("Error parsing JSON:", (error as Error).message);
		return null;
	}
}

// Helper function to flatten nested objects
function flattenObject(obj: JsonObject, parentKey = ""): JsonObject {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		const newKey = parentKey ? `${parentKey}.${key}` : key;

		if (typeof value === "object" && value !== null) {
			return { ...acc, ...flattenObject(value, newKey) };
		} else {
			return { ...acc, [newKey]: value };
		}
	}, {});
}
// // Example usage:
// const inputJSON =
// 	'{"context":{"bpp_id":"sellerapp.com","domain":"ONDC:RET10","action":"search"},"message":{"intent":{"provider":{"id":"P1"}}}}';
// const additionalValues = {
// 	"message.intent.provider.locations.0.id": "L1",
// 	"message.intent.category.id": "Foodgrains",
// };
// const result = transformJSON(inputJSON, additionalValues);
// console.log(result);
