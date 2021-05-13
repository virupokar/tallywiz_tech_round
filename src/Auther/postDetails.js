import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { getLikes, getPostDetailsData, getComments } from './Store/autherSliceData';
import Loading from '../Helper/Loading';
import ConstantHelper from '../Helper/ConstantHelper';

const BolgDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { likeData, postDetailsData, commentData } = useSelector(state => state.auther)

    const [data, setData] = useState([]);
    const [fetchLength, setFetchLength] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [details, setDetails] = useState([]);
    const [viewComment, setViewComment] = useState(false);

    useEffect(() => {
        dispatch(getPostDetailsData({ id: id }))
        dispatch(getLikes({ id: id }))
        viewComments()
    }, [id])

    useEffect(() => {
        if (postDetailsData && postDetailsData.length > 0) {
            setDetails(postDetailsData[0]);
            document.title = postDetailsData[0].title;
        }
    }, [postDetailsData])

    useEffect(() => {
        // setData(commentData)
        fetchMore()
    }, [commentData])

    const viewComments = () => {
        setViewComment(true);
        dispatch(getComments({ id: id }));
        setHasMoreData(true);
    }

    const closeComments = () => {
        setViewComment(false);
        setData([]);
        setFetchLength(0);
    }

    const fetchMore = () => {
        let old_data = data;
        const comment_data = [];
        if (commentData && commentData.length > 0 && commentData.length >= fetchLength) {
            for (let i = 0; i < fetchLength + 10; i++) {
                comment_data.push(commentData[i])
            }
            setFetchLength(fetchLength + 10);
            old_data = old_data.concat(comment_data);
            setData(old_data);
        }
    }

    const fetchData = () => {
        if (data?.length >= commentData.length) {
            setHasMoreData(false);
            return;
        }
        setTimeout(() => {
            fetchMore(commentData)
            setHasMoreData(true);
        }, 500);
    }

    return (
        <>
            <div>
                <div>
                    {
                        details ?
                            <>
                              
                                <div className="box-shadow bg-gray-200 text-center border-4 mx-24 p-4 rounded mt-4">
                                    {details.title} 
                                </div>
                                <div className="mb-5">
                                   
                                </div>
                                {
                                    data && data.length > 0 && viewComment ?
                                        <>
                                        <div className="box-shadow bg-gray-200 border-4 mx-24 p-4 rounded mt-4">
                                        <div className="text-lg ml-24">
                                                {commentData.length} Comments 
                                                <per className="ml-5 mr-5"> | </per>
                                                {likeData.length} Likes
                                            </div>
                                </div>
                                            
                                            <div id="comments" className="commentView">
                                                <InfiniteScroll
                                                    dataLength={data.length}
                                                    next={fetchData}
                                                    hasMore={hasMoreData}
                                                    loader={<p className="text-center"><Loading /> </p>}
                                                    endMessage={
                                                        <p className="text-center mt-10">
                                {ConstantHelper.noMoreDataTitle}
                                            </p>
                                                    }
                                                    scrollableTarget="comments"
                                                >
                                                    {
                                                        data.map((item, index) => (
                                                            <>{item && item.body &&
                                                                <div className="box-shadow border-2 mx-24 p-4 rounded mt-4">
                                                                    <div className="mx-5">
                                                                        {item.body}
                                                                    </div>
                                                                </div>}
                                                            </>
                                                        ))
                                                    }
                                                </InfiniteScroll>
                                            </div>
                                        </>
                                        : ''
                                }
                            </>
                            : ''
                    }
                </div>
                <div>
                </div>
            </div>
        </>
    )
}

export default BolgDetails;