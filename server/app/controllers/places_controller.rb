class PlacesController < ApplicationController
    # before_action :authorize_request
    skip_before_action :authorize_request, only: [:index]
    def index
        @places = Place.all 
        render json:{data: @places}, status: :ok
    end
    def create
        @place = Place.new(place_params)
        if @place.save
            render json:{message:"new entry added"}, status: :ok
        else
            render json:{error:"Incorrect details entered"}, status: :not_acceptable
        end
    end
    def update
        @place = Place.find_by(objectid: params[:id])
        unless @place
            return render json:{error:"Object not avaialeble"}, status: :not_found
        end
        if @place.update(place_params)
            render json:{message:"succesfully upated"}, status: :ok
        else
            render json:{error:"update unsuccesfull"}, status: :not_acceptable
        end
    end
    def destroy
        @place = Place.find_by(objectid: params[:id])
        unless @place
            return render json:{error:"Object not avaialeble"}, status: :not_found
        end
        @place.destroy
        render json:{message:"succesfully deleted"}, status: :ok
    end
    private 
    def place_params
        params.require(:place).permit(:objectid,:title,:info,:user_id,:imageurl)
    end
end
