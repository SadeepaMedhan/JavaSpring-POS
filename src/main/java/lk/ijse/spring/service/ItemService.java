package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    void saveItem(ItemDTO dto);
    void deleteItem(String code);
    void updateItem(ItemDTO dto);
    ItemDTO searchItem(String code);
    List<ItemDTO> getAllItems();
}
