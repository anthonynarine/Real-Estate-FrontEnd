


<CardActions>
                    {listing.property_status === "Rent"
                      ? `${listing.listing_type}: $${listing.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${
                          listing.rental_frequency
                        }`
                      : `${listing.listing_type}: ${listing.price.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    {/* //  THIS IS RENDERd NULL FOR LISTINGS SET AS FOR SALE/ Changed to rent and worked. NOT sure why this happend                       */}
                  </CardActions>