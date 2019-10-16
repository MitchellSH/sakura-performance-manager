class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]
  before_action :authenticate_user

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    @review = Review.find(params[:id])

    render json: @review
  end

  # GET /reviews/1/comments
  def comments
    @review = Review.find(params[:id]).comments.all

    render json: @review
  end

  # POST /reviews
  # POST /reviews.json
  def create
    if current_user.admin
      @review = Review.new(review_params)

      if @review.save
        render :show, status: :created, location: @review
      else
        render json: @review.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    if current_user.admin
      if @review.update(review_params)
        render :show, status: :ok, location: @review
      else
        render json: @review.errors, status: :unprocessable_entity
      end
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    if current_user.admin
      @review.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params.require(:review).permit(:title, :description, :performance, :comment, :user_id, :submitted_by)
    end
end
