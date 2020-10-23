import React, { useState, useEffect, useRef } from 'react'

export const useFetch = ( url ) => {
    const isMounted = useRef(true)
    const [state, setState] = useState({ data: null, loading: true, error:null })
    
    useEffect( () => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect( () => {
        // To show the loading when the information is going to change
        setState({ data:null, loading:true, error: null });

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                if( isMounted.current ){
                    setState({
                        data,
                        loading: false,
                        error: null
                    })
                } else {
                    console.log('setState was not called');
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'Data can not be loaded'
                })
            })
    }, [url]);

    return state;
}
