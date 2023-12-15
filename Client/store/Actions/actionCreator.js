import axios from "axios";
import { API } from "../../Configs/api";
import { DETAIL_BUSINESS_LOADING, LOADING_BUSINESS, SUCCESS_FETCH_BUSINESS, SUCCESS_FETCH_BUSINESS_DETAILS } from "./actionType";
import { Headers } from "../../Configs/headers";

export function fetchBusiness(params) {
  return async (dispatch) => {
    dispatch({
      type: LOADING_BUSINESS,
      payload: true
    })
    try {
      let URLS = `${API}`
      if (params) {
        const { sortBy, limit, offset, location, filter, price } = params
        const { search } = filter
        if (location) {
          if (sortBy) {
            URLS += `?location=${location}&attributes=&sort_by=${sortBy}`
          }
          if (limit) {
            URLS += `&limit=${limit}`
          }
          if (offset === 0 || offset) {
            URLS += `&offset=${offset}`
          }
          if (search) {
            URLS += `&term=${search}`
          }
          if (price) {
            URLS += `&price=${price}`
          }
        }
        // 'https://api.yelp.com/v3/businesses/search?location=NYC&price=2&open_now=true&attributes=&sort_by=best_match&limit=20'
        console.log(URLS);
        
        const response = await axios.get(URLS, {headers: Headers} )
        // console.log(response);
        dispatch({
          type: SUCCESS_FETCH_BUSINESS,
          payload: response
        })
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: LOADING_BUSINESS,
        payload: false
      })
    }
  }
}

export function fetchDetailBusiness(idBusiness, reviewParams) {
  return async (dispatch) => {
    dispatch({
      type: DETAIL_BUSINESS_LOADING,
      payload: true
    })
    try {
      const urlDetail = `https://api.yelp.com/v3/businesses/${idBusiness}`
      let urlReviews;
      if (reviewParams) {
        const offset = reviewParams['offset']
        urlReviews = `https://api.yelp.com/v3/businesses/${idBusiness}/reviews?offset=${offset}&limit=20&sort_by=yelp_sort`
      }
      const details = await axios.get(urlDetail, {headers: Headers})
      const reviews = await axios.get(urlReviews, { headers: Headers })
      // console.log(details.data, "details");
      dispatch({
        type: SUCCESS_FETCH_BUSINESS_DETAILS,
        payload: data = {
          details: details.data,
          reviews: reviews.data
        }
      })
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: DETAIL_BUSINESS_LOADING,
        payload: false
      })
    }
  }
}