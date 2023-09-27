class AadharVerificationController < ApplicationController

  before_action :check_user_logged_in

  # check if aadhar number and phone number match, if yes send otp for verification
  def verify_aadhar_data
    if params[:aadhar_number] && params[:contact]
      aadhar = Aadhar.where(uid: params[:aadhar_number], phone: params[:contact]).first
      if aadhar
        # If other OTPs exist delete all of them
        old_sms_otp = SmsOtp.where(user_id: get_logged_in_user_id)
        if old_sms_otp
          old_sms_otp.destroy_all
        end
        otp = rand(10 ** 6).to_s
        sms_otp = SmsOtp.new(user_id: get_logged_in_user_id,
                             otp: otp,
                             aadhar_number: params[:aadhar_number],
                             contact: params[:contact],
                             attempts_left: 3)
        if sms_otp.save
          send_sms(aadhar.phone, otp + " is your otp for ASAR account verification")
          render json: {status: "success", message: "Otp sent"} and return
        else
          error_message = sms_otp.errors.full_messages
        end
      else
        error_message = "data not found"
      end
    else
      error_message = "Parameters missing"
    end
    render json: {status: "error", error_message: error_message}
  end

  # check if otp received is correct, if not reduce an attempt left or delete it
  def verify_otp
    if params[:otp]
      sms_otp = SmsOtp.where(user_id: get_logged_in_user_id, otp: params[:otp]).first
      if sms_otp
        # get the user and update the details
        user = User.find(get_logged_in_user_id)
        user.aadhar_verified = true
        user.phone_no_verified = true
        sms_otp.delete
        user.aadhar_number = sms_otp.aadhar_number
        if user.save
          render json: {status: "success", message: "otp verified"} and return
        else
          error_message = user.errors.full_messages
        end
      else
        # Reduce an attempt_left or delete if only 1 attempt was left
        sms_otp = SmsOtp.where(user_id: get_logged_in_user_id).first
        if sms_otp
          if sms_otp.attempts_left == 1
            sms_otp.delete
          else
            sms_otp.attempts_left = sms_otp.attempts_left - 1
            sms_otp.save
          end
        end
        error_message = "Invalid OTP you can try 3 times only!"
      end
    else
      error_message = "Params Missing"
    end
    render json: {status: "error", error_message: error_message}
  end
end
