export const USECASES = [
	{
		name: "Catalog Specific QR Code",
		placeholders: [
			{
				name: "context.bpp_id",
				placeholder: "subscriber_id",
				type: "text",
			},
			{
				name: "context.domain",
				type: "select",
				placeholder: "ONDC Domain",
				options: [
					"ONDC:RET1A",
					"ONDC:RET1B",
					"ONDC:RET1C",
					"ONDC:RET1D",
					"ONDC:RET10",
					"ONDC:RET12",
					"ONDC:RET13",
					"ONDC:RET14",
				],
			},
			{
				name: "message.intent.provider.id",
				placeholder: "Provider id (Get this from Seller App)",
				type: "text",
			},
			{
				name: "message.intent.provider.locations.0.id",
				placeholder: "Provider's Location id (Get this from Seller App)",
				type: "text",
			},
		],
	},
	// {
	//   name: "Category Specific QR Code",
	//   initialValue: {
	//     context: {
	//       bpp_id: "sellerapp.com",
	//       domain: "ONDC:RET10",
	//       action: "search"
	//     },
	//     message: {
	//       intent: {
	//         category: {
	//           id: "Foodgrains"
	//         },
	//         provider: {
	//           id: "P1",
	//           locations: [
	//             {
	//               id: "L1"
	//             }
	//           ]
	//         }
	//       }
	//     }
	//   },
	//   placeholders: {
	//     "context.bpp_id": "subscriber_id",
	//     "context.domain": "ONDC Domain",
	//     "message.intent.category.id": "category",
	//     "message.intent.provider.id": "Provider id (Get this from Seller App)",
	//     "message.intent.provider.locations.0.id": "Provider's Location id"
	//   }
	// },
	// {
	//   name: "Keyword Specific QR Code",
	//   initialValue: {
	//     context: {
	//       bpp_id: "sellerapp.com",
	//       domain: "ONDC:RET10",
	//       action: "search"
	//     },
	//     message: {
	//       intent: {
	//         item: {
	//           descriptor: {
	//             name: "coffee"
	//           }
	//         },
	//         provider: {
	//           id: "P1",
	//           locations: [
	//             {
	//               id: "L1"
	//             }
	//           ]
	//         }
	//       }
	//     }
	//   }
	// },
	// {
	//   name: "Item Specific QR Code",
	//   initialValue: {
	//     context: {
	//       bpp_id: "sellerapp.com",
	//       domain: "ONDC:RET10",
	//       action: "search"
	//     },
	//     message: {
	//       intent: {
	//         item: {
	//           id: "I1"
	//         },
	//         provider: {
	//           id: "P1",
	//           locations: [
	//             {
	//               id: "L1"
	//             }
	//           ]
	//         }
	//       }
	//     }
	//   }
	// },
	// {
	//   name: "Metro Ticket Buying using QR Code",
	//   initialValue: {
	//     context: {
	//       bpp_id: "mobilitysellerapp.com",
	//       domain: "ONDC:TRV11",
	//       action: "search"
	//     },
	//     message: {
	//       intent: {
	//         fulfillments: {
	//           vehicle: {
	//             category: "METRO"
	//           }
	//         }
	//       }
	//     }
	//   }
	// }
];
