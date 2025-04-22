class User < ApplicationRecord
    validates :email,:user, uniqueness: true
    validates :email,:user,:passwd, presence:true
end
