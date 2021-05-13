import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { setResetAuthorDetails, getAuthorData, getAuthorDetailsData, getComments } from './Store/autherSliceData';
import Loading from '../Helper/Loading';
import ConstantHelper from '../Helper/ConstantHelper';

const BolgDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { userData, authorDetailsData, fetchStatus } = useSelector(state => state.auther)

    const [data, setData] = useState([]);
    const [fetchLength, setFetchLength] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [details, setDetails] = useState([]);
    const [sortDate, setSortDate] = useState(false);
    const [sortLike, setSortLike] = useState(false);
    const [status, setStatus] = useState({
        status: null,
        name: null
    })


    useEffect(() => {
        if (id == 'comments' || id == 'likes') {
            dispatch(getAuthorDetailsData({ view: "likes", order: 'desc' }))
        } else {
            dispatch(getAuthorData({ id: id }))
            dispatch(getAuthorDetailsData({ id: id, view: "", order: 'asc' }))
        }
        setHasMoreData(true);
    }, [id])

    useEffect(() => {
        if (userData && userData.length > 0) {
            setDetails(userData[0]);
            document.title = userData[0].name;
        }
    }, [userData])

    useEffect(() => {
        if (authorDetailsData && authorDetailsData.length > 0 && fetchStatus) {
            fetchMore()
        }
    }, [authorDetailsData])

    const sortLikeData = () => {
        setData([]);
        setHasMoreData(true);
        dispatch(getAuthorDetailsData({ id: id, view: "likes", order: sortLike ? 'asc' : 'desc' }));
        setFetchLength(0);
        setStatus({
            status: !sortLike,
            name: 'likes'
        })
        setSortLike(!sortLike);
        setSortDate(false);
    }

    const sortDateData = () => {
        setData([]);
        setHasMoreData(true);
        dispatch(getAuthorDetailsData({ id: id, view: "publishDate", order: sortDate ? 'asc' : 'desc' }));
        setFetchLength(0);
        setStatus({
            status: !sortDate,
            name: 'date'
        })
        setSortDate(!sortDate);
        setSortLike(false);
    }

    const fetchMore = () => {
        let old_data = data;
        const comment_data = [];
        if (authorDetailsData && authorDetailsData.length > 0 && authorDetailsData.length >= fetchLength) {
            for (let i = 0; i < fetchLength + 10; i++) {
                comment_data.push(authorDetailsData[i])
            }
            setFetchLength(fetchLength + 10);
            old_data = old_data.concat(comment_data);
            setData(old_data);
        }
    }

    const fetchDataCall = () => {
        if (data?.length >= authorDetailsData.length) {
            setHasMoreData(false);
            return;
        }
        setTimeout(() => {
            if (id == 'comments' && id == 'likes' && fetchLength <= 10) {
                fetchMore(authorDetailsData);
            }
            if (id != 'comments' && id != 'likes') {
                fetchMore(authorDetailsData);
            }
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
                                <div className="text-center m-10 text-2xl">
                                    <per className="font-bold">Posts</per>
                                    <br />
                                    {
                                        ((id != 'comments') && (id != 'likes')) ?
                                            details.name
                                            :
                                            id == 'comments' ? 'Top 10 Comment ' : 'Top 10 Liked'
                                    }
                                </div>
                                <div className="flex wrap my-10 mx-24">
                                    {
                                        (data && (data.length > 0) && (id != 'comments') && (id != 'likes')) &&
                                        <>
                                            <div className="p-2 font-bold"> Sort by </div>
                                            <button className="box-shadow p-2 mr-5 text-center border-4 rounded bg-gray-200" style={status && status.name == 'date' ? { color: 'navy' } : {}} onClick={sortDateData}>
                                                {
                                                    status && status.name == 'date' ?
                                                        status.status ?
                                                            <i class="fa fa-sort-alpha-desc mr-1" aria-hidden="true"></i>
                                                            :
                                                            <i class="fa fa-sort-alpha-asc mr-1" aria-hidden="true"></i> : ''
                                                }
                                                Published Date
                                            </button>
                                            <button className="box-shadow p-2 text-center border-4 w-54 rounded bg-gray-200" style={status && status.name == 'likes' ? { color: 'navy' } : {}} onClick={sortLikeData}>
                                                {
                                                    status && status.name == 'likes' ?
                                                        status.status ?
                                                            <i class="fa fa-sort-numeric-desc mr-1" aria-hidden="true"></i>
                                                            :
                                                            <i class="fa fa-sort-numeric-asc mr-1" aria-hidden="true"></i> : ''
                                                }
                                                Likes
                                            </button>
                                        </>
                                    }
                                </div>
                                {
                                    data && data.length > 0 ?
                                        <div id="comments" className="authorDetailsView">
                                            <InfiniteScroll
                                                dataLength={data.length}
                                                next={fetchDataCall}
                                                hasMore={hasMoreData}
                                                loader={<h4 className="text-center mt-10"> <Loading /> </h4>}
                                                endMessage={
                                                    <p className="text-center mt-10">
                                                        {ConstantHelper.noMoreDataTitle}
                                                    </p>
                                                }
                                                scrollableTarget="comments"
                                            >
                                                {
                                                    data.map((item, index) => (
                                                        <>
                                                            {(item && item.id) &&
                                                                <div className="box-shadow border-2 mx-24 p-4 rounded mt-4 mb-4" style={{ backgroundColor: '#f0f0f0' }}>
                                                                    <div className="font-bold">
                                                                        <NavLink className="nav-link" aria-current="page" to={`/postDetails/${item.id}`}>
                                                                            <i class="fa fa-dot-circle-o mr-1" aria-hidden="true"></i>{' ' + item.title}
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </>
                                                    ))
                                                }
                                            </InfiniteScroll>
                                        </div>
                                        :
                                        ''
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