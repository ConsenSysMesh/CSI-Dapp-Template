pragma solidity ^0.4.18;
import "./ECRecovery.sol";

contract Ownable {

  address public owner;

  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner {
    require(newOwner != address(0));
    owner = newOwner;
  }

}

contract ComplexStorage is Ownable {

	//state variables
	uint public numReports; //total number of reports hashed
	mapping (uint => Report) public reports; //hash of report is id --> report struct
	struct Report {
		bytes32 reportHash;
		uint32 reportTimestamp;
		uint8 lat;
		uint8 lng;
	}

	//constructor
	constructor() {
		//set numReports
		numReports = 0;
	}

	//events
	event ReportMade (bytes32 _reportHash, uint32 _reportTimestamp);
	event ReportRequested (bytes32 _reportHash, address _sender);

	//functions
		//make a report (only by owner, which makes sense because all api calls will use owner address)
		function makeReport(string report, uint32 timestamp, uint8 latitude, uint8 longitude, bytes _signedMessage) public onlyOwner returns (bool) {
			//incrementing Account
			numReports += 1;
			//adding new report to reports
			reports[numReports].reportHash = sha256(report); //should be hashed before entering mapping?
			reports[numReports].reportTimestamp = timestamp;
			reports[numReports].lat = latitude;
			reports[numReports].lng = longitude;
			//emit event
			ReportMade(reports[numReports].reportHash, reports[numReports].reportTimestamp);
			return true;
		}
		//query for report hash
		function queryReportHash(uint index) view public returns (bytes32) {
      //require
      require(index <= numReports);
      //emit event
			ReportRequested(reports[index].reportHash, msg.sender);
      //return
			return reports[index].reportHash;
		}

    function queryLastReportHash() view public returns (bytes32) {
      //emit event
			ReportRequested(reports[numReports].reportHash, msg.sender);
      //return
			return reports[numReports].reportHash;
		}

		//query for a report lat
		function queryReportLat(uint index) view public returns (uint8) {
      //require
      require(index <= numReports);
      //emit event
			ReportRequested(reports[index].reportHash, msg.sender);
			//return
			return reports[index].lat;
		}

    function queryLastReportLat() view public returns (uint8) {
      //emit event
			ReportRequested(reports[numReports].reportHash, msg.sender);
			//return
			return reports[numReports].lat;
		}


		//query for a report lng
		function queryReportLng(uint index) view public returns (uint8) {
      //require
      require(index <= numReports);
      //emit event
			ReportRequested(reports[index].reportHash, msg.sender);
			//return
			return reports[index].lng;
		}

    function queryLastReportLng() view public returns (uint8) {
      //emit event
			ReportRequested(reports[numReports].reportHash, msg.sender);
			//return
			return reports[numReports].lng;
		}

		//query for a report timestamp
		function queryReportTimestamp(uint index) view public returns (uint32) {
      //require
      require(index <= numReports);
      //emit event
			ReportRequested(reports[index].reportHash, msg.sender);
			//return
			return reports[index].reportTimestamp;
		}

    function queryLastReportTimestamp() view public returns (uint32) {
      //emit event
			ReportRequested(reports[numReports].reportHash, msg.sender);
			//return
			return reports[numReports].reportTimestamp;
		}


		//query for number of reports
		function getNumReports() view public returns (uint) {
				//return
			 return numReports;
		}

	//fallback
	function() payable { }
}
