class UsersController < ApplicationController
    skip_before_action :authorize_request
    def create
        @user = User.new(user_params)
        @user.email = BCrypt::Password.create(params[:user][:email])
        @user.passwd = BCrypt::Password.create(params[:user][:passwd])
        if @user.save
            token = JsonWebToken.encode(user_id: @user.user)
            render json:{message:"User successfully created",token: token}, status: :created
        else
            render json:{errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
    end
    def delete
        @user = User.find_by(user: params[:id])
        unless @user
            return render json:{error:"user not found"}, status: :not_found
        end
        @user.destroy
        render json:{message:"user deleted successfully"}, status: :ok
    end
    private 
    def user_params
        params.require(:user).permit(:email, :user, :passwd)
    end
end
