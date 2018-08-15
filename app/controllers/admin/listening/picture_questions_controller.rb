class Admin::Listening::PictureQuestionsController < ApplicationController
  layout "admin/application"
  before_action :find_question_type, except: %i(index new create)

  def new
    @question_type = QuestionType.new topic_id: Topic.codes[:picture]
    Settings.Admin.picture_question.num_question
            .times{@question_type.questions.build}
    @question_type.questions.each do |question|
      Settings.Admin.picture_question.num_answer
              .times{question.answers.build}
    end
  end

  def create
    @question_type = QuestionType.new question_type_params
    @question_type.topic_id = Topic.codes[:picture]
    if @question_type.save
      flash[:success] = t ".flash_success"
      redirect_to admin_listening_listening_questions_url
    else
      render :new
    end
  end

  def edit; end

  def update
    if @question_type.update_attributes question_type_params
      flash[:success] = t ".flash_success"
      redirect_to admin_listening_listening_questions_url
    else
      render :edit
    end
  end

  private

  def question_type_params
    params.require(:question_type).permit :content,
      questions_attributes: [:id, :title,
      answers_attributes: [:id, :picture, :truth]]
  end

  def find_question_type
    @question_type = QuestionType.find_by id: params[:id]
    return if @question_type
    flash[:notice] = t "admin.writing.writing_questions.update.flash_notice"
    redirect_to admin_listening_listening_questions_url
  end
end
