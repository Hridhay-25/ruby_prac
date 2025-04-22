class SessionController < ApplicationController
    skip_before_action :authorize_request
    def login
        @user = User.find_by(user: params[:user][:user])
        unless @user
            return render json:{error:"User does not exist"}, status: :not_found
        end
        if BCrypt::Password.new(@user.passwd)==params[:user][:passwd]
            token = JsonWebToken.encode(user_id: @user.user)
            render json:{token: token}, status: :ok
        else
            render json:{error:"incorrect password"}, status: :unauthorized
        end
    end
end
