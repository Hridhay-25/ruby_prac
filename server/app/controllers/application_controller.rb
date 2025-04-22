class ApplicationController < ActionController::API
    before_action :authorize_request

    private
    def authorize_request
      header = request.headers['Authorization']
      if header.nil?
        return render json: { error: 'Missing token' }, status: :unauthorized
      end
      header = header.split.last if header
      decoded = JsonWebToken.decode(header)
      puts "decoded content"
      puts decoded
      @current_user = User.find_by(user: decoded[:user_id]) if decoded
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
end
