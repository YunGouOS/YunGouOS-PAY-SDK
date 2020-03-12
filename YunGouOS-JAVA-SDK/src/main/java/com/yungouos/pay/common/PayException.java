package com.yungouos.pay.common;

/**
 * YunGouOS自定义异常，主要方便用户捕捉yungouos的异常信息
 * 
 * @author YunGouOS技术部-029
 *
 */
public class PayException extends RuntimeException {

	
	private static final long serialVersionUID = 7973713189507995958L;

	
	private String errorCode;

	
	private boolean propertiesKey = true;

	
	public PayException(String message) {
		super(message);
	}

	
	public PayException(String errorCode, String message) {
		this(errorCode, message, true);
	}

	
	public PayException(String errorCode, String message, Throwable cause) {
		this(errorCode, message, cause, true);
	}

	
	public PayException(String errorCode, String message, boolean propertiesKey) {
		super(message);
		this.setErrorCode(errorCode);
		this.setPropertiesKey(propertiesKey);
	}

	
	public PayException(String errorCode, String message, Throwable cause, boolean propertiesKey) {
		super(message, cause);
		this.setErrorCode(errorCode);
		this.setPropertiesKey(propertiesKey);
	}

	public PayException(String message, Throwable cause) {
		super(message, cause);
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public boolean isPropertiesKey() {
		return propertiesKey;
	}

	public void setPropertiesKey(boolean propertiesKey) {
		this.propertiesKey = propertiesKey;
	}

}