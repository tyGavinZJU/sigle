import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { MdSettings, MdRemoveRedEye } from 'react-icons/md';
import { format } from 'date-fns';
import Tippy from '@tippy.js/react';
import '@reach/menu-button/styles.css';
import {
  Button,
  Link,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from '../../../components';

const StoryItemContainer = styled.div`
  ${tw`py-4 border-b border-solid border-grey`};

  .top-container {
    ${tw`flex justify-between items-center mb-4`};
  }

  .right {
    ${tw`flex items-center`};
  }

  .title-container {
    ${tw`flex items-center`};
  }

  .title {
    ${tw`text-xl font-bold mr-2`};
  }

  .icon-container {
    ${tw`text-grey-dark`};
  }

  .edit {
    ${tw`mr-2`};
  }
`;

const StoryItemDate = styled.div`
  ${tw`text-grey-darker text-sm`};
`;

const StoryItemText = styled.div`
  ${tw`text-grey-darker text-sm truncate`};
`;

interface Props {
  story: {
    attrs: {
      _id: string;
      title?: string;
      excerpt?: string;
      createdAt: string;
    };
  };
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}

export const StoryItem = ({ story, onDelete, onPublish }: Props) => {
  return (
    <StoryItemContainer>
      <div className="top-container">
        <div className="left">
          <div className="title-container">
            <Link className="title" href={`me/stories/${story.attrs._id}`}>
              {story.attrs.title}
            </Link>
            <Tippy
              content={'You need to publish your article to view it'}
              arrow={true}
              arrowType="round"
              theme="light-border"
            >
              <div className="icon-container">
                <MdRemoveRedEye size={22} />
              </div>
            </Tippy>
          </div>

          <StoryItemDate>
            {format(story.attrs.createdAt, 'HH:mm DD MMMM YYYY')}
          </StoryItemDate>
        </div>
        <div className="right">
          {/*
          // @ts-ignore */}
          <Button
            color="primary"
            className="edit"
            as={Link}
            href={`me/stories/${story.attrs._id}`}
          >
            Edit
          </Button>
          <Menu>
            <MenuButton>
              <MdSettings size={24} />
            </MenuButton>
            <MenuList>
              <MenuItem onSelect={() => onPublish(story.attrs._id)}>
                Publish
              </MenuItem>
              <MenuItem
                onSelect={() => onDelete(story.attrs._id)}
                className="primary"
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <StoryItemText>{story.attrs.excerpt}</StoryItemText>
    </StoryItemContainer>
  );
};
