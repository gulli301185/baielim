import { ContentHeader, Error, Empty, Loader } from '@/widgets';
import useStoryService from '../../model/useStoryService';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ConfirmModal from '@/widgets/ConfirmModal';

const Stories = () => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isDeleting,
    handleDeleteStory,
    navigate,
    handleDeleteConfirmModal,
    storyID,
  } = useStoryService();

  if (isLoading || isFetching || isDeleting) return <Loader />;

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Сторисы' url='new' />
      <div className='w-full h-full grid grid-cols-5 gap-3'>
        {isSuccess && data.length ? (
          data.map((story) => (
            <div key={story.id} className='w-full h-64'>
              <div className='w-full h-[220px] bg-slate-200'>
                <img
                  className='w-full h-full object-contain'
                  src={story.photo}
                  alt={story.date}
                />
              </div>
              <div className='w-full flex justify-between items-center py-2'>
                <span className='text-lg font-medium'>
                  {story.date || '---- -- --'}
                </span>
                <div className='flex gap-4'>
                  <EditOutlined
                    onClick={() => navigate(`${story.id}`)}
                    className='text-blue-500 !text-3xl cursor-pointer'
                  />
                  <DeleteOutline
                    onClick={() => handleDeleteConfirmModal(story.id)}
                    className='text-red-500 !text-3xl cursor-pointer'
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
      {isError && <Error />}
      {storyID && (
        <ConfirmModal
          open={!!storyID}
          onClose={() => handleDeleteConfirmModal(0)}
          text={'Вы уверены что хотите удалить сторис'}
          onAccept={() => {
            handleDeleteStory(storyID);
            handleDeleteConfirmModal(0);
          }}
        />
      )}
    </div>
  );
};

export default Stories;
