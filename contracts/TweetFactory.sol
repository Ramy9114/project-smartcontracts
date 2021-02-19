pragma solidity >=0.4.22 <0.9.0;

/**
* @title Tweet Factory
* @author Rami Moubayed & Juan Riveros
* @dev With natspecs norm
 */

 contract TweetFactory {

    event NewTweet(uint256 tweetId, string text, string author, string date);
    event DeleteTweet(string author, string date);
    event UpdateTweet(string newText, string author, string date);

    struct Tweet {
        string text;
        string author;
        string date;
    }

    Tweet[] public tweets;
    uint256 public totalTweets;

    constructor() {
        totalTweets = 0;
    }

    /**
    * @dev A function to create a new tweet
    * @param text text of the tweet
    * @param author the author of the new tweet
    * @param date the date of the new tweet
    */
    function _createTweet(
        string memory text, 
        string memory author,
        string memory date) public {

        tweets.push(Tweet(text, author, date));
        totalTweets++;
        emit NewTweet(tweets.length - 1 , text, author, date);
    }

    /**
    * @dev A function to delete a tweet
    * @param author the author of the new tweet
    * @param date the date of the new tweet
    */
    function _deleteTweet(
        string memory author,
        string memory date) public {
            require(totalTweets > 0);
            uint256 tweetIndex = _getTweetIndex(author, date);
            tweets[tweetIndex] = tweets[totalTweets - 1];
            delete tweets[totalTweets - 1];
            totalTweets--;
            emit DeleteTweet(author, date);
    }

    /**
    * @dev A function to create a new tweet
    * @param newText text of the tweet
    * @param author the author of the new tweet
    * @param date the date of the new tweet
    */
    function _updateTweet(
        string memory newText, 
        string memory author,
        string memory date) public {
        
        uint256 tweetIndex = _getTweetIndex(author, date);

        tweets[tweetIndex].text = newText;
        emit UpdateTweet(newText, author, date);
    }

    function _getTweet(
        string memory author,
        string memory date) public view returns(string memory text, string memory authorOut, string memory dateOut){
        uint256 index = _getTweetIndex(author, date);
        return (tweets[index].text, tweets[index].author, tweets[index].date);
   }


    /**
    * @dev A function to compare two strings
    * @param a first string
    * @param b second string
    */
    function compareStrings (string memory a, string memory b)  internal pure returns (bool){
       return keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b)));
   }


    /**
    * @dev A function to get a tweet
    * @param author the author of the new tweet
    * @param date the date of the new tweet
    */
    function _getTweetIndex(
        string memory author,
        string memory date) public view returns(uint256 index){
            for (uint i = 0; i < totalTweets; i++) {
                if(compareStrings(tweets[i].author, author) && compareStrings(tweets[i].date, date)){
                    return i;
                }
            }
            revert("tweet not found");
    }

     

 }