import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getSliderPhoto: builder.query<
			SLIDER.GetSliderPhotoResponse,
			SLIDER.GetSliderPhotoRequest
		>({
			query: () => ({
				url: 'https://a0f2d006459bb950.mokky.dev/sliderPhpoto',
				method: 'GET'
			}),
			providesTags: ['slider']
		}),
		getSliderNotifi: builder.query<
			SLIDER.GetSliderPhotoResponse,
			SLIDER.GetSliderPhotoRequest
		>({
			query: () => ({
				url: 'https://0862a5cfa13ed70e.mokky.dev/sliderNotion',
				method: 'GET'
			}),
			providesTags: ['slider']
		})
	})
});
export const { useGetSliderPhotoQuery, useGetSliderNotifiQuery } = api;
