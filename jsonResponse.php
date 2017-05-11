<?php
class JsonResponse {
	private $responseObject;

	public function __construct($successIdentifier = 'success', $errorMessageIdentifier = 'errorMessage') {
		$this->responseObject = array(
			$successIdentifier => true,
			$errorMessageIdentifier => 'Something went wrong'
		);
	}

	public function setErrorMessage($errorMessage) {
		$this->responseObject['errorMessage'] = $errorMessage;
	}

	public function setOperationSuccess($hasOperationSucceeded) {
		$this->responseObject['success'] = $hasOperationSucceeded;
	}

	public function setElement($key, $value) {
		$this->responseObject[$key] = $value;
	}

	public function getElement($key, $value) {
		if(array_key_exists($key, $this->responseObject)
			return $this->responseObject[$key];
		else
			return null;
	}

	public function getJsonEncoding() {
		return json_encode($this->responseObject);
	}
}

?>