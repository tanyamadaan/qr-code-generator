export const USECASES = [
  {
    name: "Catalog Access through Seller-Generated QR Code",
    initialValue: {
      context: {
        bpp_id: "sellerapp.com",
        domain: "ONDC:RET10",
        action: "search"
      },
      message: {
        intent: {
          provider: {
            id: "P1"
          }
        }
      }
    }
  },
  {
    name: "Category-Specific Browsing via Seller-Generated QR Code",
    initialValue: {
      context: {
        bpp_id: "sellerapp.com",
        domain: "ONDC:RET10",
        action: "search"
      },
      message: {
        intent: {
          category: {
            id: "Foodgrains"
          },
          provider: {
            id: "P1",
            locations: [
              {
                id: "L1"
              }
            ]
          }
        }
      }
    }
  },
  {
    name: "Detailed Product Insight with Seller-Generated QR Code",
    initialValue: {
      context: {
        bpp_id: "sellerapp.com",
        domain: "ONDC:RET10",
        action: "search"
      },
      message: {
        intent: {
          item: {
            descriptor: {
              name: "coffee"
            }
          },
          provider: {
            id: "P1",
            locations: [
              {
                id: "L1"
              }
            ]
          }
        }
      }
    }
  },
  {
    name: "Ride Booking with QR Code",
    initialValue: {
      context: {
        bpp_id: "mobilitysellerapp.com",
        domain: "ONDC:TRV10",
        action: "search"
      },
      message: {
        intent: {
          fulfillments: {
            stops: {
              type: "start",
              location: {
                gps: "28.5566842,77.0980399"
              }
            }
          }
        }
      }
    }
  }
  
]