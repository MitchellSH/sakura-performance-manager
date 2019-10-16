class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authenticate_user

  # GET /users
  # GET /users.json
  def index
    if current_user.admin
      @users = User.all

      render json: @users
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    if current_user
      @user = User.find(params[:id])

      render json: @user
    end
  end

  # GET /users/1/reviews
  def reviews
    @reviews = User.find(params[:id]).reviews.all

    render json: @reviews
  end

  # POST /users
  # POST /users.json
  def create
    if current_user.admin
      @user = User.new(user_params)

      if @user.save
        render :show, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render :show, status: :ok, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    if current_user.admin
      @user.destroy
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :title)
  end
end
