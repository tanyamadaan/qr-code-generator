export const USECASES = [
  {
    name: "Catalog Specific QR Code",
    initialValue: {
      context: {
        bpp_id: "sellerapp.com",
        domain: "ONDC:RET10",
        action: "search"
      },
      message: {
        intent: {
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
    name: "Category Specific QR Code",
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
    name: "Keyword Specific QR Code",
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
    name: "Item Specific QR Code",
    initialValue: {
      context: {
        bpp_id: "sellerapp.com",
        domain: "ONDC:RET10",
        action: "search"
      },
      message: {
        intent: {
          item: {
            id: "I1"
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
    name: "Metro Ticket Buying using QR Code",
    initialValue: {
      context: {
        bpp_id: "mobilitysellerapp.com",
        domain: "ONDC:TRV11",
        action: "search"
      },
      message: {
        intent: {
          fulfillments: {
            vehicle: {
              category: "METRO"
            }
          }
        }
      }
    }
  }
  
]